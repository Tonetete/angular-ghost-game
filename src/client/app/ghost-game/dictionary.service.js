(function() {
  'use strict';

  angular
    .module('app.ghost-game')
    .factory('dictionaryService', dictionaryService);

  dictionaryService.$inject = ['$http', '$q', 'exception', 'logger'];
  /* @ngInject */
  function dictionaryService($http, $q, exception, logger) {
    var dictionary = [];
    var wordNode = {};

    var service = {
      initDictionary: initDictionary,
      getWordNode: getWordNode,
      getWordSuffixes: getWordSuffixes,
      isWord: isWord,
      isNotAffix: isNotAffix,
      isWordAndIsNotAffix: isWordAndIsNotAffix
    };

    return service;

    // Initialize the dictionary
    function initDictionary() {
      return $http.get('/api/dictionary')
        .success(success)
        .catch(fail);

      function success(response) {
        dictionary = response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for initDictionary')(e);
      }
    }

    // Get node letter for a word given
    function getWordNode(word) {
      var data = {
          word: word
        };
      return $http.post('/api/dictionary/wordNode', data)
        .success(success)
        .catch(fail);

      function success(response) {
        return response;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getWordNode')(e);
      }
    }

    // Get suffixes for a word given
    function getWordSuffixes(word) {
      return getWordNode(word)
        .then(function(response) {
          var data = {
              wordNode: response.data
            };
          return $http.post('/api/dictionary/wordSuffixes', data)
            .success(success)
            .catch(fail);
        });

      function success(response) {
        return response;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getWordNode')(e);
      }
    }

    // Check if it's an existing word
    function isWord(word) {
      var data = {
          word: word
        };
      return $http.post('/api/dictionary/isWord', data)
        .success(success)
        .catch(fail);

      function success(response) {
        return response;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for isWord')(e);
      }
    }

    // Check is if not an affix word
    function isNotAffix(word) {
      return getWordSuffixes(word)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data.length === 0;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for isNotAffix')(e);
      }
    }

    // Check is if not an affix word and is a word
    function isWordAndIsNotAffix(word) {
      return isWord(word)
        .then(success)
        .catch(fail);

      function success(checkIsWord) {
        return isNotAffix(word)
            .then(function(checkIsNotAffix) {
              return (!checkIsWord || checkIsNotAffix);
            });
      }

      function fail(e) {
        return exception.catcher('XHR Failed for isNotAffix')(e);
      }
    }

  }
})();
