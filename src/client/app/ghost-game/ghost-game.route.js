(function() {
  'use strict';

  angular
    .module('app.ghost-game')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'ghost-game',
        config: {
          url: '/',
          templateUrl: 'app/ghost-game/ghost-game.html',
          controller: 'GhostGameController',
          controllerAs: 'ghost',
          title: 'Ghost Game',
          settings: {
            nav: 2,
            content: '<i class="fa fa-lock"></i> Ghost Game'
          }
        }
      }
    ];
  }
})();
