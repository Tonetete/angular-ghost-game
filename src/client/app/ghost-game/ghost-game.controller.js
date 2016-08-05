(function() {
  'use strict';

  angular
    .module('app.ghost-game')
    .controller('GhostGameController', GhostGameController);

  GhostGameController.$inject = ['logger', 'dictionaryService', 'computerPlayerService', '$q'];
  /* @ngInject */
  function GhostGameController(logger, dictionaryService, computerPlayerService, $q) {
    var ghost = this;

    /* Variables */
    ghost.title = 'Ghost Game';
    ghost.subtitle = 'A game to not guessing a word!';
    ghost.word = '';
    ghost.humanPlayerTurn = 'Human player has inserted letter: ';
    ghost.computerPlayerTurn = 'Computer player has inserted letter: ';
    ghost.turn = 0; // 0 for human player and 1 for computer player
    ghost.turns = [];
    ghost.winner = -1;
    ghost.gameOver = false;
    ghost.disabledInputWord = false;
    ghost.disabledRestartBttn = true;

    /* Functions */
    ghost.activate = activate;
    ghost.callInitDictionary = callInitDictionary;
    ghost.insertLetter = insertLetter;
    ghost.unableDeleteKey = unableDeleteKey;
    ghost.checkWinner = checkWinner;
    ghost.callIsWordAndIsNotAffix = callIsWordAndIsNotAffix;
    ghost.computerPlays = computerPlays;
    ghost.showWinner = showWinner;
    ghost.restartGame = restartGame;

    ghost.activate();

    function activate() {
      logger.info('Activated Ghost Game View');
      ghost.callInitDictionary();
    }

    function restartGame() {
      ghost.word = '';
      ghost.disabledRestartBttn = true;
      ghost.disabledInputWord = false;
      ghost.turns = [];
      ghost.turn = 0;
      ghost.gameOver = false;
    }

    function insertLetter() {
      ghost.disabledRestartBttn = true;
      if (ghost.turn === 1) {
        ghost.computerPlays();
      }
      else {
        ghost.turns.push(ghost.humanPlayerTurn + ' ' + ghost.word.slice(-1));
        ghost.turn = (ghost.turn + 1) % 2;
        ghost.checkWinner()
         .then(function() {
              if (!ghost.gameOver && ghost.turn === 1) {
                ghost.disabledInputWord = true;
                ghost.insertLetter();
              }
            }
          );
      }
    }

    function computerPlays() {
      return computerPlayerService.play(ghost.word)
        .then(function(letter) {
          ghost.word = ghost.word + letter;
          ghost.turns.push(ghost.computerPlayerTurn + ' ' + letter);
          ghost.turn = (ghost.turn + 1) % 2;
          ghost.checkWinner()
           .then(function() {
            if (!ghost.gameOver) {
              ghost.disabledInputWord = false;
            }
          });
        });
    }

    function showWinner() {
      if (ghost.winner === 1) {
        logger.info('The winner is the computer player !!!');
        ghost.turns.push('The winner is the computer player !!!');
      }
      else {
        logger.info('The winner is the human player !!!');
        ghost.turns.push('The winner is the human player !!!');
      }
      ghost.disabledRestartBttn = false;
    }

    function checkWinner() {
      return ghost.callIsWordAndIsNotAffix()
      .then(function(check) {
        if (check) {
          ghost.disabledInputWord = true;
          ghost.winner = ghost.turn;
          ghost.gameOver = true;
          ghost.showWinner();
        }
      });

    }

    function unableDeleteKey($event) {
      if ($event.keyCode === 8 || $event.keyCode === 46) {
        $event.preventDefault();
      }
    }

    function callInitDictionary() {
      dictionaryService.initDictionary()
        .then(function() {
          logger.info('Dictionary loaded!');
        });
    }

    function callIsWordAndIsNotAffix() {
      return dictionaryService.isWordAndIsNotAffix(ghost.word);
    }

  }
})();
