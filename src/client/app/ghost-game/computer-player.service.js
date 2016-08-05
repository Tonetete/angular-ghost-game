(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('computerPlayerService', computerPlayerService);

  computerPlayerService.$inject = ['$http', '$q', 'exception', 'logger', 'dictionaryService'];
  /* @ngInject */
  function computerPlayerService($http, $q, exception, logger, dictionaryService) {
    var service = {
      play: play
    };

    return service;

    // Method to play computer player
    function play(word) {

      return dictionaryService.getWordSuffixes(word)
        .then(success)
        .catch(fail);

      function success(response) {
        var wordSuffixToPlay = applyStrategy(response.data);
        return wordSuffixToPlay.slice(0, 1);
      }

      function fail(e) {
        return exception.catcher('XHR Failed for play')(e);
      }
    }

    // Strategy to apply for the computer player. If follows to choose
    // always and even length remaining word, if that's not possible, just
    // choose the longest word in order to keeping the game as posible
    function applyStrategy(data) {
      var wordSuffixChoice = evenRemainLengthStrategy(data);
      if (wordSuffixChoice === -1) {
        wordSuffixChoice = longestWordStrategy(data);
      }
      return wordSuffixChoice;
    }

    function evenRemainLengthStrategy(data) {
      var index = 0, find = false;
      while (!find && index < data.length) {
        if (data[index].length % 2 === 0) {
          find = true;
        }
        index = index + 1;
      }
      return (find ? data[index - 1] : -1);
    }

    function longestWordStrategy(data) {
      var max = -1, index = 0, maxIndex = 0;
      while (index < data.length) {
        if (data[index].length > max) {
          max = data[index].length;
          maxIndex = index;
        }
        index = index + 1;
      }
      return data[maxIndex];
    }

  }
})();
