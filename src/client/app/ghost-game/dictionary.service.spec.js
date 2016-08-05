/* jshint -W117, -W030 */
describe('DictionaryService', function() {
  var dictionaryService, $httpBackend, $rootScope;
  var dictionary, error;

  beforeEach(function() {
    module('app.ghost-game');
    inject(function($injector) {
      dictionaryService = $injector.get('dictionaryService');
      $httpBackend = $injector.get('$httpBackend');
      $rootScope = $injector.get('$rootScope');
      $q = $injector.get('$q');
    });

    dictionary = {'a':{'a': {'^': 1} } };
    error = 'error';

  });

  beforeEach(inject(function () {
        // Make sure we have flushed all of our requests.
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      }));

  it('call initDictionary success', function() {
    var result;
    // Every time we hit the specified url,
    // respond with mockResponse.
    $httpBackend.when('GET', '/api/dictionary').respond(200, {'result': dictionary});

    // The promise reference now holds the $http call returned
    var promise = dictionaryService.initDictionary();

    // Flush the backend
    $httpBackend.flush();

    // Use .then() like you would normally.
    promise.then(function (response) {
      expect(JSON.stringify(response.data.result)).to.equal(JSON.stringify(dictionary));
    });

    $rootScope.$apply();

  });

  it('call initDictionary catch', function() {
    var result;
    // Every time we hit the specified url,
    // respond with mockResponse.
    $httpBackend.when('GET', '/api/dictionary').respond(500, {'result': error});

    // The promise reference now holds the $http call returned
    var promise = dictionaryService.initDictionary();

    // Flush the backend
    $httpBackend.flush();

    // Use .catch() like you would normally.
    promise.catch(function (response) {
      expect(response.data.result).to.equal('error');
    });

    $rootScope.$apply();

  });

  it('call getWordNode success', function() {
    // Every time we hit the specified url,
    // respond with mockResponse
    $httpBackend.when('POST', '/api/dictionary/wordNode').respond(200,{'result':'a'});

    // The promise reference now holds the $http call returned
    var promise = dictionaryService.getWordNode();

    // Flush the backend
    $httpBackend.flush();

    // Use .then() like you would normally.
    promise.then(function (response) {
        expect(response.data.result).to.equal('a');
      });

    // Manually trigger a $digest cycle
    if (!$rootScope.$$phase) {
      $rootScope.$digest();
    }
  });

  it('call getWordNode catch', function() {
    // Every time we hit the specified url,
    // respond with mockResponse
    $httpBackend.when('POST', '/api/dictionary/wordNode').respond(500, {'result':error});

    // The promise reference now holds the $http call returned
    var promise = dictionaryService.getWordNode();

    // Flush the backend
    $httpBackend.flush();

    // Use .then() like you would normally.
    promise.catch(function (response) {
        expect(response.data.result).to.equal(error);
      });

    // Manually trigger a $digest cycle
    if (!$rootScope.$$phase) {
      $rootScope.$digest();
    }
  });

  it('call getWordSuffixes success', function() {
    // Every time we hit the specified url,
    // respond with mockResponse.
    var arrayMock = ['a', 'e', 'i'];
    $httpBackend.when('POST', '/api/dictionary/wordNode').respond(200, {'result':'a'});
    $httpBackend.when('POST', '/api/dictionary/wordSuffixes').respond(200, {'result': arrayMock});

    // The promise reference now holds the $http call returned
    var promise = dictionaryService.getWordSuffixes();
    var promise2;

    // Flush the backend
    $httpBackend.flush();

    // Use .then() like you would normally.
    promise.then(function (response) {
      expect(response.data.result).to.include.members(arrayMock);
    });

    // Manually trigger a $digest cycle
    if (!$rootScope.$$phase) {
      $rootScope.$digest();
    }
  });

  it('call getWordSuffixes catch', function() {
    // Every time we hit the specified url,
    // respond with mockResponse.
    $httpBackend.when('POST', '/api/dictionary/wordNode').respond(500, {'result': error});
    $httpBackend.when('POST', '/api/dictionary/wordSuffixes').respond(500, {'result':error});

    // The promise reference now holds the $http call returned
    var promise = dictionaryService.getWordSuffixes();

    // Flush the backend
    $httpBackend.flush();

    // Use .then() like you would normally.
    promise.catch(function (response) {
      expect(response.data.result).to.equal(error);
    });

    // Manually trigger a $digest cycle
    if (!$rootScope.$$phase) {
      $rootScope.$digest();
    }
  });

  it('call isWord success', function() {
    // Every time we hit the specified url,
    // respond with mockResponse.
    $httpBackend.when('POST', '/api/dictionary/isWord').respond(200, {'result':true});

    // The promise reference now holds the $http call returned
    var promise = dictionaryService.isWord();

    // Flush the backend
    $httpBackend.flush();

    // Use .then() like you would normally.
    promise.then(function (response) {
      expect(response.data.result).to.equal(true);
    });

    // Manually trigger a $digest cycle
    if (!$rootScope.$$phase) {
      $rootScope.$digest();
    }
  });

  it('call isWord catch', function() {
    // Every time we hit the specified url,
    // respond with mockResponse.
    $httpBackend.when('POST', '/api/dictionary/isWord').respond(500, {'result':error});

    // The promise reference now holds the $http call returned
    var promise = dictionaryService.isWord();

    // Flush the backend
    $httpBackend.flush();

    // Use .then() like you would normally.
    promise.catch(function (response) {
      expect(response.data.result).to.equal(error);
    });

    // Manually trigger a $digest cycle
    if (!$rootScope.$$phase) {
      $rootScope.$digest();
    }
  });

  it('call isNotAffix success with isNotAffix result in false ' +
  ' (is not a complete word)', function() {
    // Every time we hit the specified url,
    // respond with mockResponse.
    var arrayMock = ['a', 'e', 'i'];
    $httpBackend.when('POST', '/api/dictionary/wordNode').respond(200, {'result':'a'});
    $httpBackend.when('POST', '/api/dictionary/wordSuffixes').respond(200, {'result': arrayMock});

    // The promise reference now holds the $http call returned
    var promise = dictionaryService.isNotAffix();

    // Flush the backend
    $httpBackend.flush();

    // Use .then() like you would normally.
    promise.then(function (response) {
      expect(response).to.equal(false);
    });

    // Manually trigger a $digest cycle
    if (!$rootScope.$$phase) {
      $rootScope.$digest();
    }
  });

  it('call isNotAffix catch', function() {
    // Every time we hit the specified url,
    // respond with mockResponse.
    var arrayMock = ['a', 'e', 'i'];
    $httpBackend.when('POST', '/api/dictionary/wordNode').respond(200, {'result':error});
    $httpBackend.when('POST', '/api/dictionary/wordSuffixes').respond(200, {'result': error});

    // The promise reference now holds the $http call returned
    var promise = dictionaryService.isNotAffix();

    // Flush the backend
    $httpBackend.flush();

    // Use .then() like you would normally.
    promise.catch(function (response) {
      expect(response.data.result).to.equal(error);
    });

    // Manually trigger a $digest cycle
    if (!$rootScope.$$phase) {
      $rootScope.$digest();
    }
  });

  it('call isWordAndIsNotAffix success for a non affix word and fake word', function() {
    // Every time we hit the specified url,
    // respond with mockResponse.
    var arrayMock = [];
    $httpBackend.when('POST', '/api/dictionary/isWord').respond(200, {'result':false});
    $httpBackend.when('POST', '/api/dictionary/wordNode').respond(200, {'result':'a'});
    $httpBackend.when('POST', '/api/dictionary/wordSuffixes').respond(200, {'result': arrayMock});

    // The promise reference now holds the $http call returned
    var promise = dictionaryService.isWordAndIsNotAffix();

    // Flush the backend
    $httpBackend.flush();

    // Use .then() like you would normally.
    promise.then(function (response) {
      expect(response).to.equal(false);
    });

    // Manually trigger a $digest cycle
    if (!$rootScope.$$phase) {
      $rootScope.$digest();
    }
  });

  it('call isWordAndIsNotAffix catch', function() {
    $httpBackend.when('POST', '/api/dictionary/isWord').respond(200, {'result': error});
    $httpBackend.when('POST', '/api/dictionary/wordNode').respond(200, {'result': error});
    $httpBackend.when('POST', '/api/dictionary/wordSuffixes').respond(200, {'result': error});
    // The promise reference now holds the $http call returned
    var promise = dictionaryService.isWordAndIsNotAffix();

    // Flush the backend
    $httpBackend.flush();

    // Use .then() like you would normally.
    promise.catch(function (response) {
      expect(response).to.equal(error);
    });

    // Manually trigger a $digest cycle
    if (!$rootScope.$$phase) {
      $rootScope.$digest();
    }
  });

});
