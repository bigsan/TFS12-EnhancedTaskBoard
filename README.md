TFS12-EnhancedTaskBoard
================

A Team Foundation Server 2013 Web Access Extension which adds features to task board.

This version is for TFS2013 only, and is rewritten from scratch of its previous version [tfs11-extensions](https://github.com/bigsan/tfs11-extensions), which supports TFS2012.

Features
-----------------
* Add work item id to task boards.
* Add state to backlog items with different background color.
	* Done: dark green
	* Commited: light gray
	* Approved: red
	* New: red
* Add days-ago of work items since last modified with different background color.
	* more then 2 days: dark green
	* less then 2 days: dark red
	* less then 1 day: dark red with light green left border.
* Add assigned-to name and image of backlog items.
* Add user image, remaining work and task count of each state when in summray people-view (row collapsed).
* Show parent backlog summary of current task on mouse over.
* Collapse/expand all backlog items.
* Maximize workspace.

Screen Shots
-----------------

***Backlog View***

![Backlog View](https://raw.github.com/bigsan/TFS12-EnhancedTaskBoard/master/ScreenShots/BacklogView.png)

***People View***

![People View](https://raw.github.com/bigsan/TFS12-EnhancedTaskBoard/master/ScreenShots/PeopleView.png)

Installation
-----------------
Download pre-built versions from [release tab](https://github.com/bigsan/TFS12-EnhancedTaskBoard/releases), then upload and enable it from the Team Web Access Extension page.

Build From Source Code
-----------------
[Grunt](http://gruntjs.com/) is required to build project, so make sure the [nodejs](http://nodejs.org/) is installed before building this project.

1. Clone or download this project.
2. Open command prompt under `EnhancedTaskBoard/` directory.
3. `> npm install`
4. `> grunt dist`
5. Upload the output zip file under `Output` folder to Team Web Access Extension page.
6. Enable it, done.


References
-----------------
* [Task Board Enhancer](http://pascoal.net/task-board-enhancer/) from Tiago Pascoal
* [Tfs Js Extension using TypeScript](http://www.codeproject.com/Articles/660203/Tfs-Js-Extension-using-TypeScript) from [CodeProject](http://www.codeproject.com/)