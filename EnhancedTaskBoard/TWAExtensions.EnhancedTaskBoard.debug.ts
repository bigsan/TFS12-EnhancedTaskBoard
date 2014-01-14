/// <reference path="scripts/_references.ts" />
import TFS = require("Presentation/Scripts/TFS/TFS");
import TFS_Core = require("Presentation/Scripts/TFS/TFS.Core");
import TFS_Host = require("Presentation/Scripts/TFS/TFS.Host");
import TFS_OM = require("Presentation/Scripts/TFS/TFS.OM");
import TFS_Resources_Common = require("Presentation/Scripts/TFS/Resources/TFS.Resources.Common");
import TFS_UI_Controls = require("Presentation/Scripts/TFS/TFS.UI.Controls");
import TFS_UI_Controls_Menus = require("Presentation/Scripts/TFS/TFS.UI.Controls.Menus");
import TFS_UI_Controls_Navigation = require("Presentation/Scripts/TFS/TFS.UI.Controls.Navigation");
import TFS_WorkItemTracking = require("WorkItemTracking/Scripts/TFS.WorkItemTracking");

declare var $: JQueryStatic;
declare var amplify: amplifyStatic;

/*
// View             Route			    Modules loaded last
// ==============   ==================  ========================
// Features
// Backlog items
//      Backlog     backlogs.backlog    Controls > ProductBacklog > ProductBacklog.MappingPanel
//      Board       backlogs.board      Controls > Boards.Controls
// Iteration
//      Backlog     backlogs.iteration  Controls > ProductBacklog > TaskBoard.View > TaskBoard > SprintPlanning
//      Board       backlogs.taskboard  Controls > ProductBacklog > TaskBoard.VIew > TaskBoard > SprintPlanning
*/

module EnhancedBoardModule {
    export class Core {
        private WorkItemManager: TFS_WorkItemTracking.WorkItemManager;
        private CurrentlyFetchingWorkItems: boolean;

        constructor(
            private TFS: typeof TFS,
            private Host: typeof TFS_Host,
            private Core: typeof TFS_Core,
            private TFS_OM: typeof TFS_OM,
            private Controls: typeof TFS_UI_Controls,
            private MenuControls: typeof TFS_UI_Controls_Menus,
            private NavControls: typeof TFS_UI_Controls_Navigation,
            private TFS_WorkItemTracking: typeof TFS_WorkItemTracking,
            private CommonResources: typeof TFS_Resources_Common) { }

        public init(): any {
            Logger.log('currentRoute: ', this.getCurrentRoute());

            var bundle = new Bundle(this.getModuleBase());
            bundle.injectCss();
            bundle.injectBundleJS();

            this.initWorkItemManagerEvents();

            this.addMaximizeWorkspaceToggleFilter();
            this.setupPopoverOfParentItem();

            if (this.isTaskBoard()) {
                this.addToolbarButtonsToTaskBoard();
                this.addTaskboardIDs();
                this.addTaskboardExtraInfos();
                this.initTaskboardNavigateEvents();
            } else if (this.isAgileBoard()) {
                this.addAgileboardIDs();
            }
        }

        private addMaximizeWorkspaceToggleFilter() {
            Logger.log("addMaximizeWorkspaceToggleFilter");

            var filterContainer = $('.filters:first');
            var maxWksFilter = ToggleFilter.create("maximize workspace")
                .prependTo(filterContainer)
                .bind('changed', this.maximizeWorkspaceChanged)
                .triggerHandler('changed');
            this.Controls.Enhancement.ensureEnhancements(maxWksFilter);
        }

        private maximizeWorkspaceChanged(e, item) {
            Logger.log("toggleMaximizeWorkspace");

            var MAX_WORKSPACE_KEY = 'maxWorkspace';
            var max = false;
            if (typeof (item) === "undefined") {
                max = amplify.store(MAX_WORKSPACE_KEY) || false;
                ToggleFilter.setToggle(e.target, max);
            }
            else {
                max = item.value == "on";
                amplify.store(MAX_WORKSPACE_KEY, max);
            }

            var HEADER_HEIGHT = 91;
            var MIN_HEADER_HEIGHT = 0;

            var headerMarginTop = max ? -HEADER_HEIGHT + MIN_HEADER_HEIGHT : 0;
            var contentTop = max ? MIN_HEADER_HEIGHT : HEADER_HEIGHT;

            $.when(
                $(".header-section").animate({ 'margin-top': headerMarginTop }),
                $(".content-section").animate({ 'top': contentTop })
            ).then(function () {
                $(".productbacklog-grid-results").parent().resize();
                $(this).dequeue();
            });
        }

        private addToolbarButtonsToTaskBoard() {
            if (!this.isTaskBoard()) { return; }
            Logger.log("addToolbarButtonsToIterationBoard");

            var pivotHub = $(".hub-pivot");
            var toolbar = $("<div class='toolbar hub-pivot-toolbar' />").insertAfter(pivotHub);
            var menubarSettings = {
                items: [
                    {
                        id: "expandAll",
                        text: this.CommonResources.ExpandAll,
                        title: this.CommonResources.ExpandAllToolTip,
                        showText: false,
                        icon: "icon-tree-expand-all"
                    },
                    {
                        id: "collapseAll",
                        text: this.CommonResources.CollapseAll,
                        title: this.CommonResources.CollapseAllToolTip,
                        showText: false,
                        icon: "icon-tree-collapse-all"
                    },
                    {
                        id: "refresh",
                        text: "Refresh",
                        title: "Refresh",
                        showText: false,
                        icon: "icon-refresh"
                    }
                ],
                executeAction: function (e) {
                    var cmd = e.get_commandName();
                    switch (cmd) {
                        case "expandAll":
                            $(".taskboard-row-summary::visible").each(function (idx, el) {
                                $(el).prev().find(".taskboard-expander").click();
                            });
                            break;
                        case "collapseAll":
                            $(".taskboard-row-summary:not(:visible)").each(function (idx, el) {
                                $(el).prev().find(".taskboard-expander").click();
                            });
                            break;
                        case "refresh":
                            this.refresh();
                            break;
                    }
                }
            };
            this.Controls.BaseControl.createIn(this.MenuControls.MenuBar, toolbar, menubarSettings);

            $(".hub-pivot-content").css("top", "+=40px");
        }

        private initWorkItemManagerEvents(): void {
            var service = this.TFS_OM.TfsTeamProjectCollection.getDefaultConnection().getService(this.TFS_WorkItemTracking.WorkItemStore);
            this.WorkItemManager = service.workItemManager;
            this.WorkItemManager.attachWorkItemChanged((sender, args) => {
                if (args.change === this.TFS_WorkItemTracking.WorkItemChangeType.Reset || args.change === this.TFS_WorkItemTracking.WorkItemChangeType.SaveCompleted) {
                    Logger.log('*** WorkItemChanged', args.change);
                    window.setTimeout(() => {
                        if (this.isTaskBoard()) {
                            this.addTaskboardIDs();
                            this.addExtraInfoToTaskboardWorkItem(args.workItem);
                        }
                        else if (this.isAgileBoard()) { this.addAgileboardIDs(); }
                    }, 100);
                }
            });
        }

        private initTaskboardNavigateEvents(): void {
            this.Host.history.attachNavigate('*', () => {
                this.addTaskboardIDs();
                this.addTaskboardExtraInfos();
            }, true);
        }

        private addTaskboardIDs() {
            Logger.log('addTaskboardIDs');

            function addBoardID(board, id) {
                $(".witTitle > .wiid", board).remove();
                $("<strong class='wiid'/>").text(id).prependTo($(".witTitle", board));
            }

            $('.tbTile').not(':has(.wiid)').each((idx, board: any) => {
                var id = board.id.match(/\d+$/)[0];
                addBoardID(board, id);
            });

            if (this.isBacklogItemsView()) {
                $('.taskboard-parent[id]').each((idx, item: any) => {
                    var id = item.id.match(/\d+$/)[0];
                    var board1 = $(".tbPivotItem", item);
                    var board2 = $(item).closest('.taskboard-row').next().find('.taskboard-parent .tbPivotItem');
                    addBoardID(board1.add(board2), id);
                });
            }
        }

        private addTaskboardExtraInfos() {
            var ids0 = $('.tbTile').map((idx, item: any) => { return item.id.match(/\d+$/)[0]; }).get();
            var ids1 = $('.taskboard-parent[id]').map((idx, item: any) => { return item.id.match(/\d+$/)[0]; }).get();
            var ids = ids0.concat(ids1);

            var GET_WORKITEMS_KEY = "beginGetWorkItems";
            var actionId = this.TFS.globalProgressIndicator.actionStarted(GET_WORKITEMS_KEY);
            this.WorkItemManager.beginGetWorkItems(ids, workitems => {
                $.each(workitems, (idx, wi) => {
                    this.addExtraInfoToTaskboardWorkItem(wi);
                });
                this.TFS.globalProgressIndicator.actionCompleted(GET_WORKITEMS_KEY);
            });
        }

        private addAgileboardIDs() {
            Util.watchUntil(() => $('.board-tile').not(':has(.wiid)').length > 0, 100).then(() => {
                $('.board-tile').not(':has(.wiid)').each((idx, board) => {
                    var id = $(board).data('item-id');
                    $(".title > .wiid", board).remove();
                    $("<strong class='wiid'/>").text(id).prependTo($(".title", board));
                });
            });
        }

        /****************************************************************/
        private isTaskBoard(): boolean {
            return $(".taskboard").length > 0;
        }

        private isAgileBoard(): boolean {
            return $(".agile-board").length > 0;
        }

        private isPeopleView(): boolean {
            return this.Host.history.getCurrentState().action == "people";
        }

        private isBacklogItemsView(): boolean {
            return this.Host.history.getCurrentState().action == "requirements";
        }

        private getCurrentTeamName(): string {
            return this.Host.TfsContext.getDefault().currentTeam.name;
        }

        private getCurrentRoute() {
            var nav = this.Host.TfsContext.getDefault().navigation;
            return (nav.currentController + "." + nav.currentAction).toLowerCase();
        }

        private getModuleBase(): string {
            return this.TFS.getModuleBase(EnhancedBoardExtension._typeName);
        }

        private refresh(): void {
            this.Host.ActionManager.performAction(this.Host.CommonActions.ACTION_WINDOW_RELOAD);
        }
        /****************************************************************/


        private beginGetParentItem(id, callback) {
            Logger.log("beginGetParentItem");
            var that = this;
            that.WorkItemManager.beginGetWorkItem(id, function (workItem) {
                var links = workItem.getLinks();
                var parentLink = $.grep<any>(links, function (e, i) { return e.baseLinkType == "WorkItemLink" && e.getLinkTypeEnd().name == "Parent"; })[0];

                if (!parentLink) {
                    Logger.log("no parent item for #" + id);
                    callback(null);
                }
                else {
                    that.WorkItemManager.beginGetWorkItem(parentLink.getTargetId(), function (workItem) {
                        callback(workItem);
                    });
                }
            });
        }

        private setupPopoverOfParentItem() {
            Logger.log("setupPopoverOfParentItem");

            var that = this;
            function showParentItem(tile: JQuery, id: string) {
                var dfd = $.Deferred();

                if (!tile.data('parentItemTitle')) {
                    that.beginGetParentItem(id, function (parentItem) {
                        if (parentItem == null) dfd.reject();

                        var title = parentItem.id + ": " + parentItem.getTitle();
                        tile.data('parentItemTitle', title);
                        dfd.resolve();
                    });
                }
                else {
                    dfd.resolve();
                }

                dfd.done(function () {
                    var hint = $("#parentItemHint").hide();
                    hint = hint.length ? hint : $("<div id='parentItemHint'/>").appendTo("body").hide();

                    var title = tile.data('parentItemTitle');
                    var tileOffset = tile.offset();
                    hint.text(title).attr("title", title);

                    tileOffset.left += 6;
                    tileOffset.top -= (hint.height() - 1);
                    hint.css({ left: tileOffset.left, top: tileOffset.top }).show();
                });
            }

            if (this.isAgileBoard()) {
                /*
                div.hub-pivot-content
                    div.board-tile[data-item-id=9999]
                        div.title.ellipsis
                        div.container
                            div.value.ellipsis
                            div.name.ellipsis
                */
                $(".hub-pivot-content")
                    .on("mousemove", ".board-tile", function (e) {
                        var tile = $(this);
                        var id = tile.data("item-id");
                        showParentItem(tile, id);
                    });
            }
            else if (this.isTaskBoard()) {
                /*
                table#taskboard-table
                    tr.taskboard-row
                        td#taskboard-table-p9999.taskboard-cell.taskboard-parent
                            div.tbPivotItem
                                div.taskboard-parent-wrapper
                                    span.witTitle
                                    span.icon.action
                                div.witRemainingWork.ellipsis
                        td.taskboard-cell
                            div#tile-9999.tbTile
                                div.tbTileContent
                                    div.witTitle
                                    div.witExtra
                                        div.witRemainingWork
                                            div.ellipsis
                                        div.witAssignedTo
                                            div.ellipsis
                */
                $("#taskboard")
                    .on("mousemove", ".tbTile", function (e) {
                        if (!that.isPeopleView()) { return false; }

                        var tile = $(this);
                        var id = tile.attr("id").match(/tile-(\d+)/)[1];
                        showParentItem(tile, id);
                        return false;
                    });
            }

            $('.hub-pivot-content, #taskboard').on("mousemove scroll", function () {
                $("#parentItemHint").hide();
            });
        }

        private addExtraInfoToTaskboardWorkItem(workItem: TFS_WorkItemTracking.WorkItem) {
            if (!this.isTaskBoard()) { return; }
            Logger.log("addExtraInfoToTaskboardWorkItem");

            var id = workItem.getFieldValue("System.Id");
            var state = workItem.getFieldValue("System.State");
            var changedDate = workItem.getFieldValue("System.ChangedDate").value;

            var msecsAgo = (new Date()).getTime() - changedDate.getTime();
            var daysAgo = (msecsAgo / 86400000);

            var daysAgoElement = $("<div class='daysAgo'>" + daysAgo.toFixed(1) + "d</div>").attr("title", "Last Changed: " + changedDate.toLocaleString());
            if (daysAgo < 2) { daysAgoElement.addClass("recent"); }
            if (daysAgo <= 1) { daysAgoElement.addClass("recent-1day"); }

            var tbTile = $("#tile-" + id);
            if (tbTile.length) {
                tbTile.find(".daysAgo").remove();
                tbTile.find(".witExtra").prepend(daysAgoElement.clone());
                if (daysAgo <= 1) { tbTile.find(".tbTileContent").addClass("recent recent-1day"); }
            }

            var tbPivotItem = $("#taskboard-table_p" + id + " .tbPivotItem");
            if (tbPivotItem.length) {
                var summaryPivotItem = tbPivotItem.closest(".taskboard-row").next(".taskboard-row-summary").find('.taskboard-parent .tbPivotItem');

                var assignedTo = workItem.getFieldValue("System.AssignedTo");
                if (this.isBacklogItemsView()) {
                    var stateElement = $("<span class='pivot-state'>" + state + "</span>").addClass(state.toLowerCase());
                    var assignedToElement = $("<span class='pivot-assigned-to'/>").text(assignedTo);

                    tbPivotItem.find(".daysAgo, .pivot-state, .pivot-assigned-to").remove();
                    summaryPivotItem.find(".daysAgo, .pivot-state, .pivot-assigned-to").remove();

                    tbPivotItem.find(".witRemainingWork").before(daysAgoElement.clone()).after(stateElement.clone());
                    summaryPivotItem.append(daysAgoElement.clone()).append(stateElement.clone());

                    tbPivotItem.append(assignedToElement.clone());
                    summaryPivotItem.append(assignedToElement.clone());
                }
                else if (this.isPeopleView()) {
                    summaryPivotItem.closest('.taskboard-parent').addClass('people-view');

                    summaryPivotItem.find('.witRemainingWork, .witRemainingWorkDetail').remove();

                    summaryPivotItem.append(tbPivotItem.find('.witRemainingWork').clone());

                    var todoTiles = tbPivotItem.closest('.taskboard-parent').siblings('.taskboard-cell[axis=taskboard-table_s0]').find('.tbTile');
                    var progTiles = tbPivotItem.closest('.taskboard-parent').siblings('.taskboard-cell[axis=taskboard-table_s1]').find('.tbTile');
                    var doneTiles = tbPivotItem.closest('.taskboard-parent').siblings('.taskboard-cell[axis=taskboard-table_s2]').find('.tbTile');
                    var sum = (prev, curr, idx, arr) => prev + (parseFloat($(curr).text()) || 0);
                    var todoHour = todoTiles.find('.witRemainingWork').get().reduce(sum, 0) || 0;
                    var progHour = progTiles.find('.witRemainingWork').get().reduce(sum, 0) || 0;

                    var witDetail = $('<div />').addClass('witRemainingWorkDetail')
                        .append($('<div class="todo" />').html(Util.format('<div>{1} h</div><div>({0} tasks)</div>', todoTiles.length, todoHour)))
                        .append($('<div class="progress" />').html(Util.format('<div>{1} h</div><div>({0} tasks)</div>', progTiles.length, progHour)))
                        .append($('<div class="done" />').html(Util.format('<div>({0} tasks)</div>', doneTiles.length)))

                    summaryPivotItem.append(witDetail);
                }
                this.addMemberImage(tbPivotItem.add(summaryPivotItem), assignedTo);
            }
        }

        private beginGetIdentityId(displayName: string, callback: Function) {
            var MEMBER_DATA_KEY = "__MEMBER_DATA__";

            function findId(name: string) {
                var memberData: any[] = JSON.parse(amplify.store.sessionStorage(MEMBER_DATA_KEY));
                for (var i = 0, count = memberData.length; i < count; i++) {
                    var m = memberData[i];
                    if (m.displayName == name) { return m.id; };
                }
                return "";
            }

            var promise = $.Deferred(dfd => {
                var memberData = amplify.store.sessionStorage(MEMBER_DATA_KEY);
                if (!memberData) {
                    var teamService: TFS_OM.TeamService = this.TFS_OM.TfsTeamProjectCollection.getDefaultConnection().getService(this.TFS_OM.TeamService);
                    var tfsContext = this.Host.TfsContext.getDefault();
                    teamService.beginGetTeamMembers(tfsContext.currentTeam.identity.id, false, 100, (members: any[]) => {
                        amplify.store.sessionStorage(MEMBER_DATA_KEY, JSON.stringify(members));
                        dfd.resolve();
                    });
                }
                else {
                    dfd.resolve();
                }
                return dfd.promise();
            })

            promise.done(() => {
                var id = findId(displayName);
                callback(id);
            });
        }

        private addMemberImage(tiles: JQuery, displayName: string) {
            if (!displayName) return;
            this.beginGetIdentityId(displayName, (identityId) => {
                if (identityId == "") { return; }

                var tfsContext = this.Host.TfsContext.getDefault();
                var imageUrl = tfsContext.getIdentityImageUrl(identityId);

                var ruleSelector = '.etb.identity-' + identityId;
                tiles.find(ruleSelector).remove();
                var avatar = $('<div/>')
                    .addClass('etb identity-picture')
                    .addClass('identity-' + identityId)
                    .css('background-image', 'url(' + imageUrl + ')');
                tiles.append(avatar);
            });
        }
    }

    class Bundle {
        constructor(public baseUrl: string) { }

        injectCss() {
            Logger.log("injectCss");
            var css = this.baseUrl + "style.min.css";
            $("head").append($("<link>").attr({ "rel": "stylesheet", "type": "text/css", "href": css }));
        }

        injectBundleJS() {
            Logger.log("injectBundleJS");
            var src = this.baseUrl + "bundle.js";
            $("head").append($("<script>").attr({ "type": "text/javascript", "src": src }));
        }
    }

    class ToggleFilter {
        static create(title: string) {
            var template = [
                '<div class="select pivot-filter enhance" title="{title}">',
                '<span class="title">{title}</span>',
                '<ul class="pivot-filter-items">',
                '<li class="pivot-filter-item" data-value="on" title="On"><a href="#">On</a></li>',
                '<li class="pivot-filter-item" data-value="off" title="Off"><a href="#">Off</a></li>',
                '</ul>',
                '</div>'
            ].join("");

            return $(template).attr("title", title)
                .find(".title").text(title).end();
        }
        static setToggle(toggleFilterElement, value: boolean) {
            $(toggleFilterElement).find('li[data-value=' + (value ? 'on' : 'off') + ']').addClass('selected');
        }
    }

    class Util {
        static watchUntil(predicate: () => boolean, interval: number) {
            var MAX_RETRY = 100;
            var dfd = $.Deferred();
            var retry = 0;
            (function watch() {
                Logger.log('watchUntil.watch');
                if (predicate()) { dfd.resolve(); }
                else {
                    if (retry++ >= MAX_RETRY) { dfd.reject(); }
                    else { window.setTimeout(watch, interval); }
                }
            })();
            return dfd.promise();
        }

        static format(pattern: string, ...args: any[]) {
            return ''.replace.call(pattern, /\{(\d+)\}/g, (m, num) => args[num]);
        }
    }
}

class Logger {
    static log(...objs: any[]) {
        if (window && window.console && window.console.log) {
            window.console.log.apply(window.console, objs);
        }
    }
}

class EnhancedBoardExtension extends TFS_UI_Controls.BaseControl {
    static _typeName = "TWAExtensions.EnhancedTaskBoard";

    constructor(options) {
        super(options);
    }

    initializeOptions(options) {
        super.initializeOptions($.extend({}, options));
    }

    initialize() {
        var core = new EnhancedBoardModule.Core(
            TFS,
            TFS_Host,
            TFS_Core,
            TFS_OM,
            TFS_UI_Controls,
            TFS_UI_Controls_Menus,
            TFS_UI_Controls_Navigation,
            TFS_WorkItemTracking,
            TFS_Resources_Common);
        core.init();
    }
}

TFS.initClassPrototype(EnhancedBoardExtension, {});
TFS_UI_Controls.Enhancement.registerEnhancement(EnhancedBoardExtension, '.taskboard');
TFS_UI_Controls.Enhancement.registerEnhancement(EnhancedBoardExtension, '.agile-board');
