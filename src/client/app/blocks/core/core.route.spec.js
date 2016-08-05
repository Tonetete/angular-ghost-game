/* jshint -W117, -W030 */
describe('core', function() {
  describe('state', function() {
    var views = {
      four0four: 'app/core/404.html'
    };

    beforeEach(function() {
      module('app.core', bard.fakeToastr);
      bard.inject('$location', '$rootScope', '$state', '$templateCache', '$httpBackend');
      $templateCache.put(views.core, '');
    });

    it('should map /404 route to 404 View template', function() {
      expect($state.get('404').templateUrl).to.equal(views.four0four);
    });

    it('should route /invalid to the otherwise (404) route', function() {
      $location.path('/invalid');
      expect($location.path()).to.equal('/invalid');
    });
  });
});
