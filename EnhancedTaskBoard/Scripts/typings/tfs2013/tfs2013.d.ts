declare module "Presentation/Scripts/TFS/TFS" {
    var uiCulture: string;
    function queueCallbacks(context, callback, errorCallback, data);
    function queueRequest(context, target, propName, successCallback, errorCallback, worker);
    function getErrorMessage(error);
    var errorHandler: any; /* ErrorHandler */
    function handleError(error, callback, context);
    var globalProgressIndicator: {
        actionStarted(name, immediate?: boolean);
        actionCompleted(id);
    }; /* GlobalProgressIndicator */
    function hasUnloadRequest();
    var ServerException: string;
    function classExtend(ctor, members);
    function getTypeName(type);
    function initClassPrototype(ctor, members);
    function getModuleBase(moduleName);
    function using(moduleNames, moduleLoaded);
    function module(moduleName, moduleDependencies, moduleFunc);
    function tfsModuleLoaded(moduleName, moduleExports);
}
declare module "Presentation/Scripts/TFS/TFS.Core" {
    var OperationCanceledException: string;
    var utcOffset: number;
    var supportsDayLightSavingsTime: boolean;
    var timeZoneMap: any[];
    function validateParameters(parameters, expectedParameters, validateParameterCount);
    function delegate(instance, method, data);
    function curry(fn);
    function transformError(errorCallback, messageOrTransform, errorInfo);
    function keys(obj, all);
    function delay(instance, ms, method, data);
    function throttledDelegate(instance, ms, method, data);
    function poll(callback, delay, firstDelay);
    function getAntiForgeryTokenValue();
    function getAntiForgeryTokenValue2();
    function setAntiForgeryToken(form);
    var DateUtils: {
        MILLISECONDS_IN_MINUTE: number;
        MILLISECONDS_IN_HOUR: number;
        MILLISECONDS_IN_DAY: number;
        MILLISECONDS_IN_WEEK: number;
        isMinDate(date);
        compare(date1, date2);
        equals(date1, date2);
        shiftToUTC(date);
        shiftToLocal(date);
        parseDateString(dateString, parseFormat, ignoreTimeZone);
        daysBetweenDates(startDate, endDate, exclusive);
        parseLocale(value, formats, ignoreTimeZone);
        localeFormat(date, format, ignoreTimeZone);
        convertClientTimeToUserTimeZone(date, adjustOffset);
        stripTimeFromDate(date);
        getNowInUserTimeZone();
        getTodayInUserTimeZone();
        format(date, format);
        ago(date, now);
        addDays(date, days, adjustOffset);
        adjustOffsetForTimes(oldDate, newDate, applicationDate);
        getOffsetForDate(date, defaultToUtcOffset);
        isGivenDayToday(date);
        isGivenDayInPast(date);
        isGivenDayInFuture(date);
        friendly(date, now);
    }
    var ArrayUtils: {
        contains(array, value, comparer);
        findIndex(array, predicate);
        intersect(arrayA, arrayB, comparer);
        intersectPrimitives(arrayA, arrayB, caseInsensitive);
        union(arrayA, arrayB, comparer);
        uniqueSort(array, comparer);
        unique(array, comparer);
        subtract(arrayA, arrayB, comparer);
        reorder(array, oldIndex, newIndex, count);
        flagSorted(array, comparer);
        copySortFlag(toArray, fromArray);
        isSorted(array, comparer);
        sortIfNotSorted(array, comparer);
        clone(array);
        indexOf(array, item);
        add(array, item);
        addRange(array, items);
        remove(array, item);
        clear(array);
    }
    var StringUtils: {
        empty: string;
        newLine: string;
        tab: string;
        htmlEncode(str);
        htmlEncodeJavascriptAttribute(str);
        htmlDecode(str);
        nl2br(str);
        defaultComparer(a, b);
        ignoreCaseComparer(a, b);
        localeComparer(a, b);
        localeIgnoreCaseComparer(a, b);
        startsWith(str, prefix, comparer);
        endsWith(str, suffix, comparer);
        caseInsensitiveContains(str, subStr);
        format(format);
        localeFormat(format);
        containsControlChars(str);
        containsMismatchedSurrogateChars(str);
    }
    var NumberUtils: {
        defaultComparer(a, b);
        toDecimalLocaleString(num, includeGroupSeparators, cultureInfo);
        parseLocale(value);
        parseInvariant(value);
        localeFormat(value, format);
    }
    var BoolUtils: {
        parse(value);
    }
    var UserAgentUtils: {
        isWindowsClient();
        getUserAgent();
    }
    class DelayedFunction {
        start();
        reset();
        cancel();
        invokeNow();
        setDelay(ms);
        setMethod(instance, method, data);
        isPending();
        constructor(instance, ms, name, method, data);
    }
    class Cancelable {
        perform(action);
        wrap(action);
        cancel();
        register(callback);
        canceled: boolean;
        context: any; /* null */
        constructor(context);
    }
    class TypeFactory {
        registerConstructor(key, ctor);
        getConstructor(key);
        createInstance(key, args);
        constructor();
    }
    class StringBuilder {
        append(text);
        appendNewLine();
        toString();
        constructor();
    }
    class OperationQueue {
        queueOperation(operation);
        constructor();
    }
}
declare module "Presentation/Scripts/TFS/TFS.Host" {
    function setImageTimestamp();
    var hostServiceManager: any; /* HostServiceManager */
    var NavigationContextLevels: {
        None: number;
        Deployment: number;
        Application: number;
        Collection: number;
        Project: number;
        Team: number;
        ApplicationAll: number;
        All: number;
    }
    var TeamFoundationHostType: {
        Parent: number;
        Unknown: number;
        Deployment: number;
        Application: number;
        ProjectCollection: number;
    }
    var notificationService: any; /* EventManager */
    var history: {
        attachNavigate(action, handler, checkCurrentState);
        getCurrentState(): {
            action: string;
        }
    }; /* History */
    var customerIntelligence: any; /* CustomerIntelligence */
    var metricsService: any; /* MetricsService */
    var urlHelper: any; /* UrlHelper */
    var CommonActions: {
        ACTION_WINDOW_OPEN: string;
        ACTION_WINDOW_NAVIGATE: string;
        ACTION_WINDOW_RELOAD: string;
        ACTION_WINDOW_UNLOAD: string;
    }
    var runningDocumentsTable: any; /* RunningDocumentsTable */
    class HostService {
        static getServiceName(type);
        getServiceName();
        constructor();
    }
    class Document {
        save(successCallback, errorCallback);
        getMoniker();
        constructor();
    }
    class DocumentService {
        constructor();
        addDeleteListener(callBack);
        removeDeleteListener(callBack);
        addBuildPropertyChangedListener(callBack);
        removeBuildPropertyChangedListener(callBack);
        addBuildStoppedListener(callBack);
        removeBuildStoppedListener(callBack);
        addModifiedChangedListener(callBack);
        removeModifiedChangedListener(callBack);
        isModified(args);
        save(successCallback, errorCallback);
        getActiveDocument();
    }
    class TfsContext {
        static ControlExtensions: {
            initializeEnhancementOptions(element, baseOptions);
        }
        static parseContext($element);
        static getDefault(): TfsContext;
        static getContextOrDefault($element);
        getHostUrl();
        getPublicActionUrl(action, controller, routeData);
        getActionUrl(action, controller, routeData);
        getPermalinkUrl(action, controller, routeData);
        getIdentityImageUrl(identityId: string, urlParams?: any);
        isEmbedded();
        getClientHost();
        contextData: any; /* null */
        configuration: any; /* null */
        navigation: {
            currentController: string;
            currentAction: string;
        }; /* null */
        currentUser: any; /* null */
        currentIdentity: any; /* null */
        currentTeam: {
            identity: {
                id: string;
            };
            name: string;
        }; /* null */
        currentUserHasTeamPermission: boolean;
        standardAccessMode: any; /* null */
        isHosted: any; /* null */
        constructor(contextData);
    }
    class EventManager {
        fire(eventName, sender, eventArgs);
        attachEvent(eventName, handler);
        detachEvent(eventName, handler);
        constructor();
    }
    class ActionManager {
        static MaxOrder: number;
        static registerActionWorker(action, actionWorker, order);
        static performAction(action, actionArgs?);
        static clearActionWorkers();
        constructor();
    }
    class RunningDocumentsTableEntry {
        document: any; /* null */
        moniker: any; /* null */
        constructor(moniker, document);
    }
}
declare module "Presentation/Scripts/TFS/TFS.OM" {
    var WebSettingsScope: {
        User: number;
        Team: number;
        UserAndTeam: number;
        Project: number;
    }
    var ContextUtils: {
        saveTeamUserStringSetting(name, value, callback);
        saveTeamUserNumberSetting(name, value, callback);
        saveTeamUserBoolSetting(name, value, callback);
    }
    class TfsConnection {
        static getConnection(connectionType, tfsContext);
        static getDefaultConnection(connectionType);
        static getConnectionLocation(connectionType, tfsContext);
        static getConnectionServiceHost(connectionType, tfsContext);
        getTfsContext();
        getCurrentUser();
        getService(serviceType);
        getCurrentServiceHost();
        getLocation();
        getHttpClient(httpClientType);
        tfsContext: any; /* null */
        services: any; /* null */
        constructor(tfsContext);
    }
    class TfsConfigurationServer {
        static getConnection(tfsContext);
        static getDefaultConnection();
        constructor(tfsContext);
    }
    class TfsTeamProjectCollection {
        static getConnection(tfsContext);
        static getDefaultConnection(): TfsConnection;
        constructor(tfsContext);
    }
    class TfsService {
        static getServiceName(serviceType);
        getTfsContext();
        getServiceName();
        getLocation();
        initializeTfsObject(tfsConnection);
        tfsConnection: any; /* null */
        constructor();
    }
    class CollectionLevelTfsService {
        constructor();
    }
    class InstanceLevelTfsService {
        constructor();
    }
    class WebSettingsService {
        constructor();
        canAccessTeamSettings();
        beginWriteSetting(registryPath, value, scope, callback, errorCallback, ajaxOptions);
        beginReadSetting(registryPath, scope, callback, errorCallback, ajaxOptions);
    }
    class TagDefinition {
        static create(tagData);
        update(tagDefinition);
        id: any; /* null */
        name: any; /* null */
        constructor(tagData);
    }
    class TagService {
        static CONTROLLER_NAME: string;
        static ACTION_QUERY_TAG_DEFINITIONS: string;
        static WORK_ITEM_ARTIFACT_KIND: string;
        constructor();
        getKnownTagDefinitions();
        getKnownTagDefinition(name, projectScope);
        beginQueryTagDefinitions(artifactApplicableKinds, projectScope, callback, errorCallback);
        invalidateCacheForArtifactKinds(artifactApplicableKinds, projectScope);
    }
    class FeatureAvailabilityService {
        static FA_RESOURCE_NAME: string;
        static isFeatureEnabled(featureName);
        constructor();
        beginIsFeatureEnabled(featureName, callback, errorCallback);
        isFeatureEnabledLocal(featureName);
    }
    class ExtensionManagementService {
        static TFS_ROOT_PATH_TOKEN: string;
        static TFS_RESOURCES_PATH_TOKEN: string;
        constructor();
        beginGetIntegrations(endPoint, callback, errorCallback);
    }
    class FavoriteItem {
        static FAVITEM_TYPE_WIT_QUERYITEM: string;
        static FAVITEM_TYPE_VC_PATH: string;
        static FAVITEM_TYPE_BUILD_DEFINITION: string;
        path(includeRoot);
        beginRename(newName, callback, errorCallback);
        beginDelete(callback, errorCallback);
        onDelete(fire, skipRemove);
        favStore: any; /* null */
        id: any; /* null */
        name: any; /* null */
        parentId: any; /* null */
        parent: any; /* null */
        type: any; /* null */
        data: any; /* null */
        constructor(favStore, itemData);
    }
    class FavoriteFolder {
        constructor(favStore, itemData);
        add(favItem, skipSort);
        remove(favItem);
        clear();
        findByPath(path);
        findByData(data);
        beginCreateNewFolder(name, callback, errorCallback);
        beginCreateNewItem(name, type, data, callback, errorCallback);
        onDelete(fire, skipRemove);
        children: any; /* null */
    }
    class FavoriteStore {
        static FAVORITE_STORE_SCOPE_FAVORITE_QUERIES: string;
        static FAVORITE_STORE_SCOPE_FAVORITE_BUILD_DEFINITIONS: string;
        static FAVORITE_STORE_SCOPE_FAVORITE_PATHS: string;
        static beginGetFavoriteStore(tfsContext, level, identity, scope, name, callback, errorCallback);
        constructor(tfsContext, routeData, identity, scope, id, name);
        beginRefresh(callback, errorCallback);
        beginDeleteItems(favItems, callback, errorCallback);
        beginUpdateItems(favItems, callback, errorCallback);
        root: boolean;
        all: any; /* null */
    }
    class Preferences {
        static PREFERENCES_STORE_SCOPE: string;
        static PREFERENCES_ITEM_TYPE: string;
        static beginGetPreferenceStore(tfsContext, level, name, callback, errorCallback);
        getValue(path);
        setValue(path, value, callback, errorCallback);
        store: any; /* null */
        error: any; /* null */
        constructor(options);
    }
    class TeamService {
        constructor();
        beginGetTeamMembers(teamIdentity: string, includeGroups: boolean, maxResults: number, callback: Function, errorCallback?: Function);
    }
    class LinkingUtilities {
        static VSTFS: string;
        static URI_SEPARATOR: string;
        static encodeUri(artifact);
        static decodeUri(artifactUri);
        static legacyDecodeURIComponent(encodedURIComponent);
        constructor();
    }
    class Artifact {
        static ACTION_ARTIFACT_EXECUTE: string;
        getUri();
        getTool();
        getType();
        getId();
        getTitle();
        setError(error);
        getError();
        execute(tfsContext);
        getUrl(tfsContext);
        constructor(data);
    }
    class AlmUriBuilder {
        static ALM_SCHEME: string;
        static COLLECTION_PARAM_NAME: string;
        static PROJECT_PARAM_NAME: string;
        static WORK_ITEM_ID_PARAM_NAME: string;
        static MFBCLIENT_SCHEME: string;
        static MFBCLIENTS_SCHEME: string;
        static FEEDBACK_REQUEST_IDS_PARAM_NAME: string;
        static ENCODED_PARAM_NAME: string;
        static browserRequiresParamEncoding();
        static beginBuildUri(areaName, actionName, includeTfsContext, parameters, completionCallback, errorCallback);
        static beginBuildCreateStoryboardUri(workItemIds, completionCallback, errorCallback);
        static buildFeedbackClientUri(workItemIds);
        static buildQueryParameterString(nameValuePairs, doNotEncode);
        constructor();
    }
    class AlmUriManager {
        static launchUri(almUri);
        constructor();
    }
    class ClientLinking {
        static MODE_TRANSLATEURL: string;
        static registerArtifactResolver(toolName, resolver);
        static getArtifactResolver(toolName);
        constructor();
        beginResolveArtifacts(artifactUris, options, callback, errorCallback);
    }
    class TeamAwarenessService {
        static contextSupports(tfsContext);
        constructor();
        beginGetTeamMembers(includeGroups, maxResults, callback, errorCallback);
        beginGetTeamSettings(callback, errorCallback);
        getTeamSettings();
    }
    class BacklogCategoryConfiguration {
        containsWorkItemType(workItemTypeName);
        getIntermediateBacklogs(endBacklog);
        getIntermediateBacklogNames(end);
        compare(backlog);
        constructor(data);
    }
    class ProjectProcessConfiguration {
        static StateType: {
            Proposed: number;
            InProgress: number;
            Complete: number;
            Requested: number;
            Received: number;
            Reviewed: number;
            Declined: number;
            Resolved: number;
        }
        static FieldType: {
            Effort: number;
            Order: number;
            RemainingWork: number;
            Team: number;
            Activity: number;
            Requestor: number;
            ApplicationType: number;
            ApplicationStartInformation: number;
            ApplicationLaunchInstructions: number;
            FeedbackNotes: number;
            ClosedDate: number;
        }
        getCategoryForWorkItemType(workItemTypeName);
        getCategoryForCategoryRefName(categoryRefName);
        getTypeField(fieldType);
        constructor(data);
    }
    class ProjectProcessConfigurationService {
        constructor();
        beginGetProcessSettings(successCallback, errorCallback);
        getProcessSettings();
    }
    class ColorsProvider {
        static DEFAULT_PRIMARY_WORKITEM_COLOR: string;
        static DEFAULT_SECONDARY_WORKITEM_COLOR: string;
        static getDefault();
        isWorkItemColorsDefined();
        getPrimaryWorkItemTypeColor(typeName);
        getSecondaryWorkItemTypeColor(typeName);
        constructor(data);
    }
}
declare module "Presentation/Scripts/TFS/Resources/TFS.Resources.Common" {
    var TeamHomeShowAllMembers: string;
    var Header_WelcomePortal: string;
    var InvalidArtifactUri: string;
    var GettingStartedCreatingCollection: string;
    var AgoAMonth: string;
    var WelcomePageCreateProjectTitle: string;
    var ViewProcessGuidance: string;
    var Header_Privacy: string;
    var ErrorDuplicateRouteArea: string;
    var NotAuthorizedToAccessPage: string;
    var HostedWelcomePageTitle: string;
    var NavigationHelpMenuMsdn: string;
    var TeamHomeOpeningWorkItemForm: string;
    var InvalidExtensionManifest: string;
    var AgileBoardsFeatureDescription: string;
    var AddSearchFilterType: string;
    var Header_ExitAdministration: string;
    var RemoveFromFavorites: string;
    var ErrorMissingManifestFileFormat: string;
    var NewTeamProjectText: string;
    var Header_Support: string;
    var Backlog: string;
    var TeamDoesNotExistOrNoAccess: string;
    var OtherCollections: string;
    var ExpandAll: string;
    var PageTitleServerHome: string;
    var HighContrastThemeName: string;
    var FeedbackFeatureName: string;
    var ItemSecurityTitle: string;
    var AddToTeamFavoritesTitle: string;
    var WelcomePageGettingStarted: string;
    var ManageSecurity: string;
    var GettingStartedCreateCollectionProgressPart1: string;
    var CollapseAllToolTip: string;
    var TeamHomeConfigureAreas: string;
    var MenuItemsLoading: string;
    var InvalidCallbackName: string;
    var HelpMenuLabel: string;
    var PageTitleProjectHome: string;
    var ErrorPluginNotFound: string;
    var Filter: string;
    var NavigationContentMenuItem_Instance: string;
    var PortfolioBacklogManagementFeatureDescription: string;
    var GettingStartedRetryTeamProjectCreationLink: string;
    var GitSupport: string;
    var AdministerServer: string;
    var Header_Administration: string;
    var TeamHomeManageMembers: string;
    var MoreMyTeams: string;
    var WelcomePageBrowseAll: string;
    var MyWork: string;
    var RemoveFromRecentItems: string;
    var WelcomePageCreateProjectDescription: string;
    var AgoAMinute: string;
    var NavigationContextMenuDefaultLabelTitle: string;
    var Header_Community: string;
    var WorkItems: string;
    var SendMailSendButton: string;
    var GettingStartedPatchLink: string;
    var GettingStartedPatchText: string;
    var Application_NoTeamProjects: string;
    var GettingStartedTeamProjectPart1: string;
    var GettingStartedTeamProjectPart2: string;
    var WelcomePageNoRecentProjects: string;
    var InvalidParameterFormat: string;
    var ViewBacklog: string;
    var TeamTitleFormat: string;
    var ErrorNoPluginElementsFormat: string;
    var UnableToFindWindowsIdentity: string;
    var AgoHours: string;
    var ManageWorkAreas: string;
    var AgoAYear: string;
    var AgoAWeek: string;
    var ManageProfile: string;
    var AgoYears: string;
    var ErrorPluginNameInvalidCharsFormat: string;
    var AgoWeeks: string;
    var TeamHomeConfigureIterations: string;
    var PortfolioBacklogManagementFeatureName: string;
    var NavigationContextMenuDefaultLabel: string;
    var FilterToolTip: string;
    var NavigationContentMenuItem_TeamProjectCollection: string;
    var MoreMyCollections: string;
    var ExtensionSlowLoadWarningHeader: string;
    var NavigationContextMenuBackToWelcomePage: string;
    var ChatRoomsFeatureName: string;
    var TeamHomeMembersTitleFormat: string;
    var NewMenuTitle: string;
    var GettingStartedTutorialFeedbackDesc: string;
    var GettingStartedErrorCreatingProject: string;
    var TestManagementFeatureDescription: string;
    var BacklogManagementFeatureName: string;
    var WelcomePageProjectConnectionMessage: string;
    var ExtensionDoesNotExist: string;
    var FeatureEnablementSettings_Error_Invalid_Admin: string;
    var ChartAuthoringFeatureName: string;
    var SendMailNoSubjectWarning: string;
    var SignOut: string;
    var SidebarSearchWatermark: string;
    var BacklogManagementFeatureDescription: string;
    var NavigationContextMenuTeamLabelTitleFormat: string;
    var ExtensionErrorHeader: string;
    var ProjectTeams: string;
    var ProjectTitleFormat: string;
    var RequiredFieldWatermark: string;
    var ItemSecurityTooltipText: string;
    var AddToMyFavoritesTooltip: string;
    var ChartViewingFeatureDescription: string;
    var CloseBrowserToCompleteSignoutMessage: string;
    var Administration: string;
    var NotSupportedBrowserMessage: string;
    var TeamHomeMoreWorkItemTypes: string;
    var ManageTeamMembers: string;
    var RequestFeedback: string;
    var WelcomePageServerAdministrationDescription: string;
    var ManageTeams: string;
    var AjaxRequestFailedWithStatus: string;
    var HomePageUpgradeToFullVersionMessage: string;
    var CancelText: string;
    var GettingStartedTeamProject: string;
    var ActionsTitle: string;
    var ErrorPluginElementMissingNameFormat: string;
    var ReleaseManagementFeatureName: string;
    var UnsavedChanges: string;
    var AllItemsText: string;
    var AddToTeamFavoritesTooltipText: string;
    var SignInAsDifferentUser: string;
    var CollapseAll: string;
    var Header_About: string;
    var WelcomePageViewOnlineHelpTitle: string;
    var AdministerAccount: string;
    var CDNDisclaimer: string;
    var SendMailTo: string;
    var MoreMyProjects: string;
    var InvalidZipArchiveFile: string;
    var AutomaticCulture: string;
    var SendMailTitle: string;
    var SearchWorkItems: string;
    var TeamHomeWorkItemCreatedMessage: string;
    var UnableToAccessCollectionFromCompatUrl: string;
    var Team_Members: string;
    var AgoMinutes: string;
    var TestMailSuccess: string;
    var NewTeamProjectGitText: string;
    var TeamHomeViewQueries: string;
    var InvalidLicenseException: string;
    var ProjectNotFound: string;
    var NavigationContentMenuItem_Account: string;
    var WelcomePageVisitGalleryDescription: string;
    var XmlSchemaErrorLine: string;
    var AddSearchFilterCreatedBy: string;
    var InvalidParameter: string;
    var ExtensionsDisabledMessage: string;
    var TeamHomeProjectAdminTitle: string;
    var NavigationContextMenuTeamLabelFormat: string;
    var WelcomePageVisitGalleryTitle: string;
    var NoImageDataUploaded: string;
    var FetchingSearches: string;
    var PageTitle: string;
    var SendMailAttachments: string;
    var GettingStartedTutorialLink: string;
    var GettingStartedTutorialText: string;
    var ChatRoomsFeatureDescription: string;
    var OpenVisualStudio: string;
    var RemoveFromTeamFavoritesTooltipText: string;
    var UnknownArtifactType: string;
    var RemoveFromMyFavoritesTitle: string;
    var AddSearchFilterAssignedTo: string;
    var NewBacklogItemToolTip: string;
    var GettingStartedRetryCollectionCreationLink: string;
    var WelcomePageSubmitFeedbackDescription: string;
    var ExtensionSlowLoadWarningBody: string;
    var ImageSizeTooLarge: string;
    var NavigationHelpMenuGettingStarted: string;
    var NoCollectionSpecifiedInCompatUrl: string;
    var UnsavedChangesWithNames: string;
    var RequireOnPremiseDeploymentError: string;
    var TestMailFailure: string;
    var InvalidErrorParameter: string;
    var Board: string;
    var SendMailSpecifyToAddress: string;
    var AgoDays: string;
    var AgoADay: string;
    var MoreCollectionProjects: string;
    var FeatureEnablementSettings_Error_Link_Invalid_Admin: string;
    var JobFailed: string;
    var HubGroupRelease: string;
    var ConfirmToDiscardEditedEmail: string;
    var InvalidContentType: string;
    var FeatureEnablementSettings_Error_Missing: string;
    var AddToMyFavoritesTitle: string;
    var ViewTaskBoard: string;
    var TestMailMessage: string;
    var TeamFavorites: string;
    var FeedbackFeatureDescription: string;
    var ServerTimeZone: string;
    var TeamHomeTeamsTitle: string;
    var TeamFoundationServerName: string;
    var TeamHomeCreateWorkItemLink: string;
    var ExpandAllToolTip: string;
    var NavigationContextMenuProjectLabelTitleFormat: string;
    var WelcomePageRecentItems: string;
    var LearnGitMessage: string;
    var GettingStartedViewOnlineHelp: string;
    var HubGroupSource: string;
    var NavigationRecentProjectsAndTeams: string;
    var InternalServerError: string;
    var ChartAuthoringFeatureDescription: string;
    var PageTitleWithContent: string;
    var SourceControlTitle: string;
    var Settings: string;
    var NoFilesSelected: string;
    var InvalidEmailWithEmail: string;
    var TestMailTitle: string;
    var PageNotFound: string;
    var AddASearchFilter: string;
    var FeatureEnablementSettings_Error_LinkText_Invalid_Admin: string;
    var ProjectDoesNotExistOrNoAccess: string;
    var Application_TeamProjects: string;
    var GettingStartedErrorCreatingCollection: string;
    var GoToProjectPortal: string;
    var Activities: string;
    var NavigationContentMenuItem_Team: string;
    var Application_SelectTeamProject: string;
    var MyFavoritesText: string;
    var AddSearchFilterState: string;
    var RetrievingWorkItemTypes: string;
    var NavigationViewUnknownTabErrorFormat: string;
    var WelcomePageViewOnlineHelpDescription: string;
    var Security: string;
    var UnkownCompatibilityUrl: string;
    var ManageProjectMembers: string;
    var BrowseAllTeams: string;
    var TeamFavoritesText: string;
    var EmailExceedsMaxBodySizeLimit: string;
    var Asterix: string;
    var HubGroupHome: string;
    var HubGroupTest: string;
    var TeamFavoritesTitle: string;
    var ManageScheduleIterations: string;
    var UnsavedChangesMore: string;
    var FeatureEnablementSettings_Error_LinkText_Missing_Admin: string;
    var PluginNotFound: string;
    var GettingStartedProgressNotStarted: string;
    var FollowingErrors: string;
    var MoreProjectTeams: string;
    var FeatureEnablementSettings_Error_Invalid: string;
    var NotAMemberOfATeam: string;
    var ManageProjectGroups: string;
    var TeamHomeManageTeams: string;
    var GettingStartedAccountActive: string;
    var ExternalControlLoading: string;
    var TeamHomeShowLessMembers: string;
    var RemoveFromMyFavoritesTooltip: string;
    var NavigationContextMenuHostedBackTo: string;
    var AddToMyFavoritesTooltipText: string;
    var TeamHomeActivitesTitle: string;
    var ViewQueries: string;
    var AgoLessThanAMinute: string;
    var ReleaseManagementFeatureDescription: string;
    var NotSupportedBrowser: string;
    var NumberOfMembers: string;
    var SendMailFrom: string;
    var DefaultThemeName: string;
    var TileLoading: string;
    var Members: string;
    var RemoveFromMyFavoritesTooltipText: string;
    var ControlPanel: string;
    var TeamHomeLoadingMembers: string;
    var OneMember: string;
    var NavigationContentMenuItem_TeamProject: string;
    var MyFavorites: string;
    var AjaxRequestTimedOut: string;
    var NavigationContextMenuOnPremBackTo: string;
    var CloseBrowserToCompleteSignoutWarning: string;
    var GettingStartedTutorialFeedback: string;
    var AgoMonths: string;
    var HubGroupBuild: string;
    var HubGroupAdmin: string;
    var YouAreAlmostThereMessagePart2: string;
    var YouAreAlmostThereMessagePart3: string;
    var YouAreAlmostThereMessagePart1: string;
    var ImageOf: string;
    var NetworkConnectionUnavailable: string;
    var BuildTitle: string;
    var FeatureEnablementSettings_Error_Missing_Admin: string;
    var TeamFoundationServiceName: string;
    var ExtensionErrorBody: string;
    var AccountTimeZone: string;
    var ManageAlerts: string;
    var TeamFavoritesBlankSlateMessage: string;
    var NewBacklogItem: string;
    var ErrorSendEmail: string;
    var NavigationAdminMenuItemFormat: string;
    var SendMailSubject: string;
    var TeamHomeLoadingActivities: string;
    var TestManagementFeatureName: string;
    var PersonalExtensionsDisabledMessage: string;
    var TeamContextNotFound: string;
    var CollectionProjects: string;
    var Project_Teams: string;
    var AgileBoardsFeatureName: string;
    var TeamHomeViewBoard: string;
    var RemoveMRUTeamTitle: string;
    var SendMailWarning: string;
    var TeamHomeViewBacklog: string;
    var InvalidEmailAddressFormat: string;
    var InvalidArgumentValue: string;
    var HubGroupWorkItems: string;
    var ChartViewingFeatureName: string;
    var Home: string;
    var PageTitleCollectionHome: string;
    var Save: string;
    var SendMailNotEnabled: string;
    var ViewReports: string;
    var AgoAnHour: string;
    var ExtensionErrorAdditionalSteps: string;
    var RemoveFromTeamFavoritesTitle: string;
    var WelcomePageSubmitFeedbackTitle: string;
}
declare module "Presentation/Scripts/TFS/TFS.UI.Controls" {
    function getId();
    class Enhancement {
        static ENHANCEMENTS_DATA_KEY: string;
        static ENHANCEMENT_OPTIONS_KEY: string;
        static ENHANCEMENT_OPTIONPREFIX_KEY: string;
        static optionsPrefix: string;
        static getType();
        static getTypeName(type);
        static getOptionPrefix(type);
        static getEnhancementOptions(type, element);
        static enhance(type, element, options);
        static getInstance(type, element);
        static getInstances(type, element);
        static registerEnhancement(type, selector, options?, errorCallback?);
        static ensureEnhancements(type, context?, errorCallback?);
        static ensureEnhancement(type, context, errorCallback);
        static registerJQueryWidget(type, widgetName, widgetOptions);
        getTypeName();
        getType();
        initializeOptions(options);
        initialize();
        enhance($element);
        getElement();
        delayExecute(name, msDelay, cancelPendingOps, func);
        cancelDelayedFunction(name);
        dispose();
        isDisposed();
        constructor(options);
    }
    class BaseControl {
        static createIn(type, container, options);
        constructor(options);
        initializeOptions(options);
        dispose();
        showElement();
        hideElement();
        enableElement(enabled);
        showBusyOverlay();
        hideBusyOverlay();
        createIn(container);
        focus();
    }
    class TreeNode {
        static create(text, config, children);
        hasChildren();
        clear();
        remove();
        add(node);
        moveTo(newParent);
        addRange(nodes);
        findNode(path, sepChar, comparer);
        sort(recursive, treeNodeComparer);
        path(includeRoot, sepChar);
        level(noRoot);
        id: number;
        root: boolean;
        text: any; /* null */
        parent: any; /* null */
        children: any; /* null */
        config: any; /* null */
        expanded: boolean;
        selected: boolean;
        icon: any; /* null */
        tag: any; /* null */
        noFocus: boolean;
        noContextMenu: boolean;
        noTreeIcon: boolean;
        folder: any; /* null */
        type: any; /* null */
        link: string;
        title: string;
        droppable: any; /* null */
        iterationPath: any; /* null */
        definition: any; /* null */
        linkDelegate: any; /* null */
        hasExpanded: boolean;
        owner: any; /* null */
        application: any; /* null */
        constructor(text, config, children);
    }
    class BaseDataSource {
        setSource(source);
        prepareSource(source);
        getComparer();
        ensureItems();
        getItems(all);
        setItems(items, allItems);
        getCount(all);
        getItem(index, all);
        getItemText(index, all, textOnly);
        getItemIndex(itemText, startsWith, all);
        nextIndex(selectedIndex, delta, all);
        constructor(options);
    }
    class ListDataSource {
        constructor(options);
    }
    class TreeDataSource {
        constructor(options);
        setSource(source);
        prepareSource(source);
        getItemText(index, all, textOnly);
        getItemIndex(itemText, startsWith, all);
        expandNode(node);
        collapseNode(node);
        root: any; /* null */
    }
    class VirtualizingListView {
        constructor(options);
        initializeOptions(options);
        initialize();
        update();
        scrollItemIntoView(index);
        selectNext(page);
        selectPrev(page);
        getSelectedIndex();
        setSelectedIndex(selectedIndex, noScrollIntoView);
        visibleRowCount: number;
    }
}
declare module "Presentation/Scripts/TFS/TFS.UI.Controls.Menus" {
    var MenuItemState: {
        None: number;
        Disabled: number;
        Hidden: number;
        Toggled: number;
    }
    var menuManager: any; /* MenuManager */
    function sortMenuItems(items);
    class MenuBase {
        constructor(options);
        getOwner();
        getContextInfo();
        getActionArguments();
        getCommandState(commandId, context);
        getMenuType();
        updateCommandStates(commands);
        isMenuBar();
        actionArguments: any; /* null */
    }
    class MenuItem {
        static getScopedCommandId(id, scope);
        constructor(options);
        initializeOptions(options);
        getCommandId();
        getAction();
        hasAction();
        hasSubMenu();
        isDecorated();
        isDefault();
        isSeparator();
        isLabel();
        isSelected();
        getCommandState(commandId, context);
        getIndex();
        setIndex(value);
        isHidden();
        isEnabled();
        isToggled();
        initialize();
        update(item);
        updateItems(items);
        select();
        deselect();
        escaped();
        execute(options);
        executeAction(args);
        collapse(options);
        setFocus();
        removeFocus();
        showHoverHighlight();
        showPressedHighlight();
        removePressedHighlight();
        removeHighlight();
        updateTitle(text);
        updateText(text);
        getSubMenu();
        tryShowSubMenu(options);
        showSubMenu(options);
        hideSubMenu(options);
        hideSiblings(options);
    }
    class Menu {
        constructor(options);
        initializeOptions(options);
        initialize();
        getItem(id);
        getItems();
        getItemByTag(tag);
        updateCommandStates(commands);
        updateItems(items);
        appendItems(appendedItems);
        selectDefaultItem(ignoreFocus);
        selectFirstItem();
        selectNextItem();
        selectPrevItem();
        selectDown(options);
        selectUp(options);
        selectRight(options);
        selectLeft(options);
        show(options);
        hide(options);
        hideChildren(excludedItem, options);
        escape(options);
        ownFocus();
        attach(parent);
        updateMenuItemStates();
        executeAction(eventArgs);
    }
    class MenuOwner {
        constructor(options);
        initializeOptions(options);
        setShowIcon(showIcon);
        initialize();
        escape(options);
        escaped(options);
        isActive();
        activate();
    }
    class MenuBar {
        constructor(options);
        initializeOptions(options);
        selectUp(options);
        selectDown(options);
        selectLeft(options);
        selectRight(options);
    }
    class PopupMenu {
        constructor(options);
        initializeOptions(options);
        popup(focusElement, pinElement);
        selectUp(options);
        selectDown(options);
        selectLeft(options);
        selectRight(options);
        escaped();
    }
}
declare module "Presentation/Scripts/TFS/TFS.UI.Controls.Navigation" {
    class NavigationView {
        constructor(options);
        initializeOptions(options);
        initialize();
        onNavigate(state);
        setViewTitle(title, tooltip);
        setViewTitleContent(title, titleContent);
        setWindowTitle(title);
        setLeftHubPaneVisibility(visible);
        setFullScreenMode(fullScreenMode, showLeftPaneInFullScreenMode);
    }
    class PivotFilter {
        static registerBehavior(behaviorType);
        static createBehavior(names, options);
        constructor(options);
        initializeOptions(options);
        initialize();
        getSelectedItems();
        getSelectedItem();
        getItem(value);
        setSelectedItem(item, fireChange);
        updateItems(items);
    }
    class PivotView {
        constructor(options);
        initializeOptions(options);
        initialize();
        updateItems();
        getSelectedView();
        setViewEnabled(id, isEnabled);
        getView(id);
        setSelectedView(view);
        onChanged(view);
    }
    class NavigationViewTab {
        constructor(options);
        onNavigate(rawState, parsedState);
        onNavigateAway();
    }
    class TabbedNavigationView {
        constructor(options);
        initializeOptions(options);
        initialize();
        showError(error);
        showErrorContent(title, $contentHtml, messageType, expand);
        showInformationTab(title, description);
        appendInformationContent(caption, collapsed);
        refreshCurrentTab();
        getCurrentAction();
        getState();
        setState(parsedState);
        getEmptyState();
        getRawState();
        parseStateInfo(action, rawState, callback);
        getTabVisibility(tabId, currentTabId, rawState, parsedState);
        getTabLabel(tabId, currentTabId, rawState, parsedState);
        setHubPivotVisibility(visible);
    }
    class NavigationLink {
        constructor(options);
        initializeOptions(options);
        initialize();
        dispose();
        onNavigate(sender, state);
        updateLink(state);
        getLocation(state);
    }
}
declare module "WorkItemTracking/Scripts/TFS.WorkItemTracking" {
    var Exceptions: {
        WorkItemBulkSaveException: string;
        ProjectDoesNotExistException: string;
        FieldDoesNotExistException: string;
        LinkTypeEndDoesNotExistException: string;
        LinkTypeDoesNotExistException: string;
        WorkItemSaveFailedDueToInvalidStatusException: string;
        InvalidQuerySyntaxException: string;
        InvalidQueryFilterRowException: string;
        QueryItemAlreadyExistException: string;
    }
    var ServerDefaultValueType: {
        None: number;
        ServerDateTime: number;
        CallerIdentity: number;
        RandomGuid: number;
    }
    var WorkItemChangeType: {
        FieldChange: string;
        PreSave: string;
        Saving: string;
        SaveCompleted: string;
        Saved: string;
        Opened: string;
        Created: string;
        Refresh: string;
        Reset: string;
        ErrorChanged: string;
        Discarded: string;
    }
    var FieldStatus: {
        Valid: number;
        InvalidEmpty: number;
        InvalidNotEmpty: number;
        InvalidFormat: number;
        InvalidListValue: number;
        InvalidOldValue: number;
        InvalidNotOldValue: number;
        InvalidEmptyOrOldValue: number;
        InvalidNotEmptyOrOldValue: number;
        InvalidValueInOtherField: number;
        InvalidValueNotInOtherField: number;
        InvalidDate: number;
        InvalidTooLong: number;
        InvalidType: number;
        InvalidComputedField: number;
        InvalidPath: number;
        InvalidCharacters: number;
        InvalidUnknown: number;
    }
    var FieldStatusFlags: {
        None: number;
        AllowsOldValue: number;
        HasFormats: number;
        HasValues: number;
        InvalidCharacters: number;
        InvalidComputedField: number;
        InvalidDate: number;
        InvalidEmpty: number;
        InvalidEmptyOrOldValue: number;
        InvalidFormat: number;
        InvalidID: number;
        InvalidListValue: number;
        InvalidMask: number;
        InvalidNotEmpty: number;
        InvalidNotEmptyOrOldValue: number;
        InvalidNotOldValue: number;
        InvalidOldValue: number;
        InvalidPath: number;
        InvalidRule: number;
        InvalidTooLong: number;
        InvalidType: number;
        InvalidValueInOtherField: number;
        InvalidValueNotInOtherField: number;
        LimitedToFormats: number;
        LimitedToValues: number;
        ReadOnly: number;
        Required: number;
        SetByRule: number;
        SetByDefaultRule: number;
        SetByComputedRule: number;
    }
    var FieldUsages: {
        None: number;
        WorkItem: number;
        WorkItemLink: number;
        Tree: number;
        WorkItemTypeExtension: number;
    }
    var FieldFlags: {
        None: number;
        Sortable: number;
        Computed: number;
        Editable: number;
        Ignored: number;
        Queryable: number;
        Reportable: number;
        PersonField: number;
        Cloneable: number;
        LongText: number;
        SupportsTextQuery: number;
    }
    var WiqlOperators: {
        NotSpace: string;
        OperatorAnd: string;
        OperatorOr: string;
        OperatorContains: string;
        OperatorNotContains: string;
        OperatorContainsWords: string;
        OperatorNotContainsWords: string;
        OperatorIn: string;
        OperatorEver: string;
        OperatorNotEver: string;
        OperatorUnder: string;
        OperatorNotUnder: string;
        OperatorInGroup: string;
        OperatorNotInGroup: string;
        OperatorEqualTo: string;
        OperatorNotEqualTo: string;
        OperatorGreaterThan: string;
        OperatorLessThan: string;
        OperatorGreaterThanOrEqualTo: string;
        OperatorLessThanOrEqualTo: string;
        MacroStart: string;
        MacroToday: string;
        MacroMe: string;
        MacroProject: string;
    }
    var EditActionType: {
        None: number;
        Revision: number;
        AddAttachment: number;
        DelAttachment: number;
        AddHyperLink: number;
        DelHyperLink: number;
        AddExternalLink: number;
        DelExternalLink: number;
        AddWorkItemLink: number;
        DelWorkItemLink: number;
    }
    var EditActionFlags: {
        FieldChanges: number;
        AttachmentChanges: number;
        HyperLinkChanges: number;
        ExternalLinkChanges: number;
        WorkItemLinkChanges: number;
    }
    var LinkQueryMode: {
        Unknown: number;
        WorkItems: number;
        LinksMustContain: number;
        LinksMayContain: number;
        LinksDoesNotContain: number;
        LinksRecursive: number;
        LinksRecursiveReturnMatchingChildren: number;
        isLinkQuery(mode);
        isTreeQuery(mode);
    }
    class QueryItem {
        path(includeRoot, separator);
        beginRename(newName, callback, errorCallback);
        beginMove(newName, newParent, callback, errorCallback);
        setPersonal(isPersonal);
        beginDelete(callback, errorCallback);
        onDelete(fire);
        id: any; /* null */
        name: any; /* null */
        parent: any; /* null */
        parentId: any; /* null */
        personal: boolean;
        project: any; /* null */
        isDirty: boolean;
        sortModifier: number;
        sortPrefix: number;
        constructor(project, itemData);
    }
    class QueryDefinition {
        static DEFAULT_NEW_QUERY_WIQL: string;
        static ASSIGNED_TO_ME_ID: string;
        static UNSAVED_WORKITEMS_ID: string;
        static CREATED_BY_ME_WORKITEMS_ID: string;
        static SEARCH_RESULTS_ID: string;
        static CUSTOM_WIQL_QUERY_ID: string;
        static defaultNewQueryWiql();
        static isMyWorkItems(query);
        static isUnsavedWorkItems(query);
        static isCreatedByMeItems(query);
        static isSearchResults(query);
        static isCustomWiqlQuery(query);
        static isCustomizableSpecialQuery(query);
        static isUneditableQuery(query);
        constructor(project, itemData);
        setQuery(wiql);
        queryText: any; /* null */
        specialQuery: boolean;
    }
    class QueryFolder {
        constructor(project, itemData);
        add(queryItem, isNewlyCreatedItem);
        remove(queryItem);
        findByPath(path);
        clear();
        beginCreateNewFolder(name, callback, errorCallback);
        beginCreateNewQuery(name, wiql, newQueryId, callback, errorCallback);
        onDelete(fire);
        setPersonal(isPersonal);
        children: any; /* null */
        specialFolder: boolean;
    }
    class QueryHierarchy {
        constructor(project, data);
        findQueryById(id);
        beginSave(callback, errorCallback);
        beginRefresh(callback, errorCallback);
        updateNewQueryId(oldId, newId);
        root: boolean;
        all: any; /* null */
        sortModifier: number;
        myQueries: any; /* null */
        sharedQueries: any; /* null */
        assignedToMe: any; /* null */
        createdByMe: any; /* null */
        unsavedWorkItems: any; /* null */
    }
    class RecentWorkItem {
        update(workItem);
        store: any; /* null */
        id: any; /* null */
        name: any; /* null */
        title: any; /* null */
        workItemTypeName: any; /* null */
        projectName: any; /* null */
        sortOrder: number;
        tempId: any; /* null */
        isDirty: boolean;
        constructor(workItem);
    }
    class RecentWorkItems {
        static MAX_COUNT: number;
        constructor(store);
        addRecent(workItem);
        removeRecentById(id);
        attachChanged(handler);
        detachChanged(handler);
        fire(eventName, sender, eventArgs);
        attachEvent(eventName, handler);
        detachEvent(eventName, handler);
        children: any; /* null */
        recentsMap: any; /* null */
    }
    class Project {
        getApiLocation(action, params);
        path();
        getWorkItemTypes();
        beginGetWorkItemType(name, callback, errorCallback);
        getWorkItemType(name);
        beginGetNodes(callback, errorCallback);
        getNodes();
        findAreaNodeByPath(nodePath);
        findIterationNodeByPath(nodePath);
        findNodeById(nodeId);
        getAreaNode(rootAsProjectNode);
        getIterationNode(rootAsProjectNode);
        beginGetQueryHierarchy(callback, errorCallback);
        beginQuery(wiql, callback, errorCallback, params);
        beginSearch(searchText, callback, errorCallback, params);
        beginSaveQueries(queryDefinitions, callback, errorCallback);
        beginDeleteQueries(queryDefinitions, callback, errorCallback);
        beginUpdateColumnOptions(persistenceId, fields, callback, errorCallback);
        beginGetGroups(includeGlobal, callback, errorCallback);
        beginGetWorkItemCategories(callback, errorCallback);
        beginGetVisibleWorkItemTypeNames(callback, errorCallback);
        constructor(store, projectData);
    }
    class WorkItemStore {
        static FutureDate: any; /* date */
        static SAVE_PAGE_SIZE: number;
        constructor();
        initializeTfsObject(tfsConnection);
        path();
        getApiLocation(action, params);
        getCurrentUser();
        beginGetFields(callback, errorCallback);
        getFieldDefinition(fieldReference);
        beginGetRecentWorkItems(callback, errorCallback);
        beginGetProjects(callback, errorCallback);
        getProjects();
        getProject(name);
        beginGetProject(name, callback, errorCallback);
        beginGetWorkItemData(ids, callback, errorCallback, options);
        beginGetWorkItem(id, callback, errorCallback);
        beginGetWorkItems(ids, callback, errorCallback);
        beginQuery(project, wiql, callback, errorCallback, params);
        beginSearch(project, searchText, callback, errorCallback, params);
        beginGetLinkTypes(callback, errorCallback);
        getRegisteredLinkTypes();
        getLinkTypes();
        getLinkTypeEnds();
        findLinkType(name);
        findLinkTypeEnd(idOrName);
        beginGetAllowedValues(fieldId, callback, errorCallback);
        beginGetGroups(project, includeGlobal, callback, errorCallback);
        beginGetWorkItemCategories(project, callback, errorCallback);
        beginGetWorkItemTypeExtension(extensionId, callback, errorCallback);
        beginGetWorkItemTypeExtensions(extensionIds, callback, errorCallback);
        beginGetConstantSet(setId, callback, errorCallback);
        beginEnsureConstantSets(setIds, callback, errorCallback);
        invalidateExtensions(extensionIds);
        getConstantSet(setId);
        beginPageWorkItems(ids, fields, callback, errorCallback, optionalRequestParams);
        beginSaveWorkItems(workItems, callback, errorCallback, storeErrors);
        beginSaveWorkItemsBatch(workItems, callback, errorCallback);
        beginGetTagWorkitemIds(workItemIds, callback, errorCallback);
    }
    class WorkItemManager {
        static cacheCleanupTimeout: number;
        static PAGE_SIZE: number;
        dispose();
        invalidateCache(workItemIds);
        cleanCache();
        resetCache();
        pin(workItem);
        unpin(workItem);
        isPinned(id);
        createWorkItem(workItemType, workItemData);
        beginGetWorkItem(id, callback, errorCallback?);
        beginGetWorkItems(ids, callback, errorCallback?, options?);
        getWorkItem(id);
        bind(workItem);
        unbind(workItem);
        setWorkItem(workItem);
        removeWorkItem(workItem);
        getManagedWorkItems();
        getDirtyWorkItems();
        beginSaveDirtyWorkItems(callback, errorCallback);
        onWorkItemChanged(sender, args);
        attachWorkItemChanged(handler);
        detachWorkItemChanged(handler);
        isDirty(onlyUserChanges);
        constructor(store);
    }
    class WorkItemType {
        path();
        create(workItemData, extensions);
        getFieldDefinition(fieldReferenceOrId);
        getTriggerList();
        project: any; /* null */
        store: any; /* null */
        id: any; /* null */
        name: any; /* null */
        fields: any; /* null */
        fieldMap: any; /* null */
        fieldMapById: any; /* null */
        form: any; /* null */
        triggerList: any; /* null */
        constructor(project, witData);
    }
    class FieldDefinition {
        checkFlag(flag);
        canSortBy();
        isCloneable();
        isComputed();
        supportsTextQuery();
        isEditable();
        store: any; /* null */
        workItemType: any; /* null */
        id: any; /* null */
        name: any; /* null */
        referenceName: any; /* null */
        type: any; /* null */
        usages: number;
        flags: number;
        rules: any; /* null */
        helpText: string;
        constructor(parent, fieldData, rules, helpText);
    }
    class TagCollection {
        addTag(definition);
        removeTag(definition);
        isModified();
        getAddedTagDefinitions();
        getRemovedTagDefinitions();
        getTags();
        getTagNames();
        reset();
        constructor(data, projectScope);
    }
    class WorkItem {
        static MAX_TITLE_LENGTH: number;
        static getTempId();
        static getTempIdSeed();
        static reserveTempId(tempId);
        discardIfNew();
        isNew();
        resetManualFieldChanges();
        isDirty(onlyUserChanges);
        isValid();
        isReadOnly();
        isExtensionMarkerField(fieldDefinition);
        getUniqueId();
        setError(error);
        clearError();
        getError();
        hasError();
        getInvalidFields(stopAtFirst);
        setFieldValue(fieldNameOrId, value);
        getFieldValue(fieldNameOrId, original?, omitSetByRule?);
        getFieldValueByRevision(fieldId, revision);
        getComputedFieldValue(fieldId, revision);
        isSaving();
        getTitle();
        getCaption(includeDirtyModifier);
        getInfoText();
        getState();
        getPerson(id);
        getIdentity(name);
        addRef();
        release();
        attachEvent(eventName, handler);
        detachEvent(eventName, handler);
        fireEvent(eventName, eventData);
        attachWorkItemChanged(handler);
        detachWorkItemChanged(handler);
        fireWorkItemChanged(args);
        fireWorkItemPreSave(args);
        fireWorkItemSaved(args);
        fireWorkItemSaving(args);
        fireWorkItemRefresh(args);
        fireWorkItemReset(args);
        fireWorkItemDiscarded(args);
        fireWorkItemSaveComplete(args);
        fireWorkItemErrorChanged(args);
        fireFieldChange(changedFields);
        attachFieldChange(fieldReferenceOrId, handler);
        detachFieldChange(fieldReferenceOrId, handler);
        getField(fieldReferenceOrId);
        computeFieldValue(fieldOrFieldId, baseFieldId, revision);
        beginSave(callback, errorCallback);
        getFieldUpdates();
        getTemplateFieldValues();
        getLinkUpdates(update);
        getTagUpdates();
        getUpdateData();
        takeUpdateResult(updateResult, update, extensions);
        evaluate(alreadyChangedFields);
        evaluateField(fieldId, valueLocked);
        evaluateFields(fieldIdsToEval, alreadyChangedFields);
        resetLinks(removeDeletedNewlinks);
        getLinks();
        findLink(link);
        addLink(link);
        addLinks(links);
        removeLinks(links);
        getHistory();
        resetHistory();
        reset();
        beginRefresh(callback, errorCallback);
        copy(type, copyLinks, copyHistory, copyTags, excludedFields);
        constructor(wit, data, extensions);
    }
    class WorkItemDocument {
        constructor(workItem);
        save(successCallback, errorCallback);
        getMoniker();
    }
    class WorkItemHistory {
        getActions();
        getMessageActions();
        findMessageActionSetByRev(rev);
        constructor(workItem);
    }
    class EditActionSet {
        add(action);
        finalize(workItem);
        getRev();
        getChangedDate();
        getChangedBy();
        messageAdded();
        stateChanged();
        fieldsChanged();
        linksChanged();
        attachmentsChanged();
        isChanged(type);
        getActions(typeComparer);
        getFieldChanges();
        getLinkChanges();
        getAttachmentChanges();
        attachmentAdded();
        attachmentDeleted();
        linkAdded();
        linkDeleted();
        getSafeHtmlMessage();
        actions: any; /* null */
        fieldAction: any; /* null */
        message: any; /* null */
        htmlMessage: any; /* null */
        stateChanges: any; /* null */
        changedByName: any; /* null */
        authorizedAs: any; /* null */
        changedByIdentity: any; /* null */
        flags: number;
        description: any; /* null */
        constructor();
    }
    class Field {
        static isEmpty(value);
        static compareValues(value1, value2, caseInsensitive);
        static isMatch(pattern, value);
        static hashset(array, caseInsensitive);
        static contains(array, value, caseInsensitive);
        static normalize(array, value);
        static intersect(a, b, caseInsensitive);
        static union(a, b, caseInsensitive);
        static subtract(a, b, caseInsensitive);
        static inList(store, value, expandedItems, globals, caseInsensitive);
        static unionLists(store, expandedItems, globals);
        static isLongTextField(fieldType);
        static isNumericField(fieldType);
        static isStringField(fieldType);
        static convertValueToDisplayString(value);
        static isValidStringFieldValue(value, isLongText);
        static normalizeStringValue(value, isLongText);
        static convertValueToInternal(store, value, fieldType);
        static convertValueToExternal(store, value, fieldType);
        static getFieldErrorText(fieldName, status, value);
        static getFieldStatus(statusFlag);
        resetUpdate();
        getValue(original, omitSetByRule);
        getDisplayText(original, omitSetByRule);
        setValue(value, preventFire);
        isDirty();
        isUserChange();
        isValid();
        isHistoricalRevision();
        isEditable();
        isReadOnly();
        isRequired();
        getErrorText();
        getStatus();
        validate(validator);
        hasList();
        isLimitedToAllowedValues();
        getAllowedValues();
        isChangedInRevision(revision);
        workItem: any; /* null */
        fieldDefinition: any; /* null */
        customValidators: any; /* null */
        constructor(workItem, fieldDefinition);
    }
    class FilterManager {
        static EVENT_FILTER_CHANGED: string;
        static EVENT_FILTER_CLEARED: string;
        static EVENT_WORK_ITEM_UPDATED: string;
        static EVENT_FILTER_ACTIVATED: string;
        static EVENT_FILTER_DEACTIVATED: string;
        getFilterProvider(type);
        registerFilterProvider(type, filterProvider);
        unregisterFilterProvider(type);
        addFilter(type, content);
        removeFilter(type, content);
        clearFilters(type);
        rebuildMatchingWorkItems();
        getMatchingWorkItems();
        isFiltered();
        fire(eventName, sender, eventArgs);
        attachEvent(eventName, handler);
        detachEvent(eventName, handler);
        updateWorkItemId(oldId, newId);
        setOriginalWorkItems(workItems);
        constructor(workItemIds);
    }
    class TagFilterProvider {
        static PROVIDER_TYPE: string;
        addFilter(tag);
        removeFilter(tag);
        clearFilters();
        getMatchingWorkItems(items);
        setTags(tagsDictionary);
        unsetTags(eventType);
        updateWorkItemId(oldId, newId);
        updateWorkItem(workItemId, tags, suppressEvents);
        getActiveFilterTags();
        getAvailableFilterTags();
        getAllFilterTags();
        getTagItemCount(tagName);
        isActive();
        toggleFilterActivation();
        deactivateFilter(suppressClearEvents);
        activateFilter();
        isFiltering();
        constructor(options);
    }
    class Link {
        static createFromLinkData(workItem, linkData);
        isNew();
        isRemoved();
        getComment();
        setComment(comment);
        remove(options);
        clone(target);
        getFieldId();
        getIsLocked();
        setIsLocked(value);
        getAddedDate();
        getRemovedDate();
        equals(link);
        getArtifactLinkType();
        constructor(workItem, linkData);
    }
    class ExternalLink {
        static create(workItem, registeredLinkType, artifactUri, comment);
        constructor(workItem, linkData);
        getArtifactLinkType();
        getLinkedArtifactUri();
        clone(target);
    }
    class Hyperlink {
        static create(workItem, location, comment);
        constructor(workItem, linkData);
        getArtifactLinkType();
        getLocation();
        clone(target);
    }
    class WorkItemLink {
        static create(workItem, linkTypeEndOrId, targetId, comment);
        constructor(workItem, linkData);
        getSourceId();
        getTargetId();
        getAddedDate();
        getAddedBy();
        getRemovedDate();
        getRemovedBy();
        getLinkType();
        getLinkTypeEnd();
        clone(target);
    }
    class Attachment {
        static create(workItem, fileName, fileGuid, comment, fileLength, fileCreationDate, fileLastWriteDate);
        constructor(workItem, linkData);
        getName();
        setName(value);
        getLength();
        setLength(value);
        getFilePath();
        setFilePath(value);
        getUri(contentOnly);
        open();
        save();
    }
    class ServerDefaultValue {
        toString();
        valueOf();
        constructor(type, originalValue);
    }
    class QueryAdapter {
        constructor();
        initializeTfsObject(tfsConnection);
        getInvariantFieldName(localizedFieldName, throwError);
        getInvariantFieldValue(invariantFieldName, invariantOperator, localizedValue);
        processClause(clause);
        beginEnsureFields(callback, errorCallback);
        beginGetOneHopLinkTypes(callback, errorCallback);
        beginGetRecursiveLinkTypes(callback, errorCallback);
        beginGetQueryableFields(callback, errorCallback);
        beginGetAvailableOperators(localizedFieldName, callback, errorCallback);
        getField(fieldName);
        getFieldType(field, fieldName);
        beginGetAvailableFieldValues(project, localizedFieldName, localizedOperator, includePredefinedValues, callback, errorCallback);
        beginGenerateWiql(editInfo, columns, sortColumns, callback, errorCallback);
        store: any; /* null */
        queryableFields: any; /* null */
        availableOperators: any; /* null */
        availableFieldValues: any; /* null */
        oneHopLinkTypes: any; /* null */
        recursiveLinkTypes: any; /* null */
        getLocalizedOperator(invariantOperator);
        getInvariantOperator(localizedOperator);
        isGroupOperator(localizedOperator);
        isFieldComparisonOperator(localizedOperator);
    }
    class BulkOperation {
        static SCRIPT_RELIEF_TIMEOUT: number;
        beginUpdateWorkItems(workItemIds, changes, operationCompletedCallback, errorCallback, options);
        constructor();
    }
    class WorkItemTeamUtil {
        static beginTrySetWorkItemTeamDefaults(workItem, callback, errorCallback);
        constructor();
    }
}