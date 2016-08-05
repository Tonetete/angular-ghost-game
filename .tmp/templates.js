angular.module("app.core").run(["$templateCache", function($templateCache) {$templateCache.put("app/layout/ht-top-nav.html","<nav class=\"navbar navbar-fixed-top navbar-inverse\"><div class=navbar-header><a href=\"/\" class=navbar-brand><span class=brand-title>{{vm.navline.title}}</span></a> <a class=\"btn navbar-btn navbar-toggle\" ng-click=\"isCollapsed = !isCollapsed\"><span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></a></div><div class=\"navbar-collapse collapse\" uib-collapse=isCollapsed><div class=\"pull-right navbar-logo\"><ul class=\"nav navbar-nav pull-right\"><li><a>{{vm.navline.description}}</a></li><li><a ng-href={{vm.navline.link}} target=_blank>{{vm.navline.text}}</a></li><li class=\"dropdown dropdown-big\"><a href=http://www.angularjs.org target=_blank><img src=images/AngularJS-small.png></a></li></ul></div></div></nav>");
$templateCache.put("app/layout/shell.html","<div ng-controller=\"ShellController as vm\"><header class=clearfix><ht-top-nav navline=vm.navline></ht-top-nav></header><section id=content class=content><div ng-include=\"\'app/layout/sidebar.html\'\"></div><div ui-view class=shuffle-animation></div><div ngplus-overlay ngplus-overlay-delay-in=50 ngplus-overlay-delay-out=700 ngplus-overlay-animation=dissolve-animation><img src=images/busy.gif><div class=\"page-spinner-message overlay-message\">{{vm.busyMessage}}</div></div></section></div>");
$templateCache.put("app/layout/sidebar.html","<div ng-controller=\"SidebarController as vm\"><ht-sidebar when-done-animating=vm.sidebarReady()><div class=sidebar-filler></div><div class=sidebar-dropdown><a href=#>Menu</a></div><div class=sidebar-inner><div class=sidebar-widget></div><ul class=navi><li class=\"nlightblue fade-selection-animation\" ng-class=vm.isCurrent(r) ng-repeat=\"r in vm.navRoutes\"><a ui-sref={{r.name}} ng-bind-html=r.settings.content></a></li></ul></div></ht-sidebar></div>");
$templateCache.put("app/ghost-game/ghost-game.html","<section class=mainbar><section class=matter><div class=container><div class=row><div class=\"widget wviolet\"><div ht-widget-header title={{ghost.title}}></div><div class=\"widget-content user\"><div class=input-group><span class=input-group-addon>Insert Word</span> <input ng-focus=ghost.focusInput ng-disabled=ghost.disabledInputWord ng-keydown=ghost.unableDeleteKey($event) type=text class=form-control name=word ng-model=ghost.word ng-change=ghost.insertLetter()><div class=input-group role=group><button ng-click=ghost.restartGame() ng-disabled=ghost.disabledRestartBttn type=button class=\"btn btn-default user\">Restart Game</button></div></div></div><div class=widget-foot><div class=clearfix></div><div class=\"panel panel-default\"><div class=panel-heading>Turns information</div><div class=panel-body><ul class=list-group><li class=list-group-item ng-repeat=\"t in ghost.turns track by $index\">{{ t }}</li></ul></div></div></div></div></div></div></section></section>");
$templateCache.put("app/widgets/widget-header.html","<div class=widget-head ng-class=\"{\'collapsive\': allowCollapse === \'true\'}\" ng-click=toggleContent()><div class=\"page-title pull-left\">{{title}}</div><small class=page-title-subtle ng-show=subtitle>({{subtitle}})</small><div class=\"widget-icons pull-right\"></div><small class=\"pull-right page-title-subtle\" ng-show=rightText>{{rightText}}</small><div class=clearfix></div></div>");
$templateCache.put("app/blocks/core/404.html","<section id=dashboard-view class=mainbar><section class=matter><div class=container><div class=row><div class=col-md-12><ul class=today-datas><li class=bred><div class=pull-left><i class=\"fa fa-warning\"></i></div><div class=\"datas-text pull-right\"><a><span class=bold>404</span></a>Page Not Found</div><div class=clearfix></div></li></ul></div></div><div class=row><div class=\"widget wblue\"><div ht-widget-header title=\"Page Not Found\" allow-collapse=true></div><div class=\"widget-content text-center text-info\"><div class=container>No soup for you!</div></div><div class=widget-foot><div class=clearfix></div></div></div></div></div></section></section>");}]);