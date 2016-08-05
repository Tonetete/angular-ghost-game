/* jshint -W117, -W030 */
describe('ghost game routes', function() {
  describe('state', function() {
    var view = 'app/ghost-game/ghost-game.html';

    beforeEach(function() {
      module('app.ghost-game', bard.fakeToastr);
      bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
    });

    beforeEach(function() {
      $templateCache.put(view, '');
    });

    it('should map state ghost-game to url /ghost-game ', function() {
      expect($state.href('ghost-game', {})).to.equal('/');
    });

    it('should map /ghost-game route to ghost-game View template', function() {
      expect($state.get('ghost-game').templateUrl).to.equal(view);
    });

    it('of ghost-game should work with $state.go', function() {
      $state.go('ghost-game');
      $rootScope.$apply();
      expect($state.is('ghost-game'));
    });
  });
});
