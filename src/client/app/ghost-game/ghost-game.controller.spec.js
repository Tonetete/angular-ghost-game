/* jshint -W117, -W030 */
describe('GhostGameController', function() {
  var ghostController, mockDictionaryService = {}, mockComputerPlayerService = {}, scope;
  var mockEvent = {};

  beforeEach(function() {
    bard.appModule('app.ghost-game');
    bard.inject('$controller', '$log', '$rootScope', 'dictionaryService',
     'computerPlayerService', '$q');

    // creating scope to inject to our controller instance
    scope = $rootScope.$new();

    // init mock dictionary trie structure for values 'aahed', 'aahing' and 'aahs'

    mockDictionaryService.initDictionary = function() {
      var defer = $q.defer();
      defer.resolve({});
      return defer.promise;
    };

    // Returns true by default, that means, is a word but is an affix of any
    mockDictionaryService.isWordAndIsNotAffix = function() {
      var defer = $q.defer();
      defer.resolve(true);
      return defer.promise;
    };

    // Computer player plays and type letter 'a'
    mockComputerPlayerService.play = function() {
      var defer = $q.defer();
      defer.resolve('a');
      return defer.promise;
    };

    // To mock keypressed event
    mockEvent.keyCode = 46;
    mockEvent.preventDefault = function() {
      return false;
    };

  });

  beforeEach(function() {
    ghostController = $controller('GhostGameController',{
      $scope: scope,
      dictionaryService: mockDictionaryService,
      computerPlayerService : mockComputerPlayerService,
      $event: mockEvent
    });
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Ghost Game controller', function() {
    it('should be created successfully', function() {
      expect(ghostController).to.be.defined;
    });

    describe('after activate', function() {
      it('should have title of Admin', function() {
        expect(ghostController.title).to.equal('Ghost Game');
      });

      it('should have logged "Activated"', function() {
        expect($log.info.logs).to.match(/Activated/);
      });
    });

    it('expect initDictionary service to be called', function() {
      ghostController.activate();
      $rootScope.$apply(); // flush pending promises
      expect(dictionaryService.initDictionary).to.have.been.AtLeastOnce;
    });

    it('insert last letter in player turn and makes computer player the winner', function() {
      ghostController.word = 'a';
      ghostController.turn = 0;
      ghostController.insertLetter();
      $rootScope.$apply();
      expect(dictionaryService.isWordAndIsNotAffix).to.have.been.AtLeastOnce;
      expect(ghostController.winner).to.equal(1);
    });

    it('insert a non last letter in player turn and check computer turn', function() {
      // Redefine mockservice for isWordAndIsNotAffix to return false so we can test is not a final word
      mockDictionaryService.isWordAndIsNotAffix = function() {
        var defer = $q.defer();
        defer.resolve(false);
        return defer.promise;
      };

      ghostController.word = 'a';
      ghostController.turn = 0;
      ghostController.insertLetter();
      $rootScope.$apply();
      expect(dictionaryService.isWordAndIsNotAffix).to.have.been.AtLeastOnce;
      // Computer player plays letter 'a' and set turn to 0 again
      expect(computerPlayerService.play).to.have.been.AtLeastOnce;
      expect(ghostController.turn).to.equal(0);
      expect(ghostController.word).to.equal('aa');
      expect(ghostController.disabledInputWord).to.equal(false);
    });

    it('insert computer player a non last letter and check human player turn', function() {
      // Redefine mockservice for isWordAndIsNotAffix to return false so we can test is not a final word
      mockDictionaryService.isWordAndIsNotAffix = function() {
        var defer = $q.defer();
        defer.resolve(false);
        return defer.promise;
      };
      ghostController.turn = 1;
      ghostController.insertLetter();
      $rootScope.$apply();
      expect(dictionaryService.isWordAndIsNotAffix).to.have.been.AtLeastOnce;
      // Computer player plays letter 'a' and set turn to 0 for player
      expect(computerPlayerService.play).to.have.been.AtLeastOnce;
      expect(ghostController.turn).to.equal(0);
      expect(ghostController.word).to.equal('a');
      expect(ghostController.disabledInputWord).to.equal(false);
    });

    it('check unableDeleteKey', function() {
      ghostController.unableDeleteKey(mockEvent);
    });

    it('check restarGame', function() {
      ghostController.restartGame();
      expect(ghostController.turns.length).to.equal(0);
    });

  });
});
