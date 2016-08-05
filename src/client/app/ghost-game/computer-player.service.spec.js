/* jshint -W117, -W030 */
describe('ComputerPlayerService', function() {
  var computerPlayerService, mockDictionaryService = {}, $httpBackend, $rootScope;
  var arraySuffixes = [];

  beforeEach(function() {
    module('app.ghost-game');
    inject(function($injector) {
      computerPlayerService = $injector.get('computerPlayerService');
      dictionaryService = $injector.get('dictionaryService');
      $httpBackend = $injector.get('$httpBackend');
      $rootScope = $injector.get('$rootScope');
      $q = $injector.get('$q');
    });

  });

  // Even strategy remain length is applying when all the obtaining suffixes has a remain even length,
  // in that case, choose the first one
  it('play applying an evenRemainLengthStrategy', function() {
      // The promise reference now holds the $http call returned
      arraySuffixes = ['eare', 'isto', 'ending'];

      mockDictionaryService.getWordSuffixes = function() {
        var defer = $q.defer();
        defer.resolve({'data': arraySuffixes});
        return defer.promise;
      };

      bard.mockService(dictionaryService, {
        getWordSuffixes: mockDictionaryService.getWordSuffixes
      });

      var promise = computerPlayerService.play();

      // Get the first
      promise.then(function (response) {
        expect(response).to.equal('e');
      });

      $rootScope.$apply();

    });

  // When all the remaining suffixes have an odd length, just choose the longest one
  // in order to keep the game as long as possible.
  it('play applying a longestWordStrategy', function() {
    arraySuffixes = ['o', 'i', 'endingo'];

    mockDictionaryService.getWordSuffixes = function() {
      var defer = $q.defer();
      defer.resolve({'data': arraySuffixes});
      return defer.promise;
    };

    bard.mockService(dictionaryService, {
      getWordSuffixes: mockDictionaryService.getWordSuffixes
    });

    // The promise reference now holds the $http call returned
    var promise = computerPlayerService.play();

    promise.then(function (response) {
          expect(response).to.equal('e');
        });

    $rootScope.$apply();
  });

});
