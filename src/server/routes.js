var router = require('express').Router();
var four0four = require('./utils/404')();
var data = require('./data');
var extendTrie = require('extend-trie');
var path = require('path');

router.get('/dictionary', getDictionary);
router.post('/dictionary/wordNode', getWordNode);
router.post('/dictionary/wordSuffixes', getWordSuffixes);
router.post('/dictionary/isWord', isWord);
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;

//////////////

// Dir assets
var dirAssets = path.join(__dirname, '/assets');
var maxLengthWord = 4;

function getDictionary(req, res, next) {
  var dictionary = extendTrie.initDictionary(dirAssets, 'word.lst', maxLengthWord);
  res.status(200).send(dictionary);
}

function getWordNode(req, res, next) {
  var wordNode = extendTrie.getWordNode(req.body.word);
  res.status(200).send(wordNode);
}

function getWordSuffixes(req, res, next) {
  var wordSuffixes = extendTrie.showWordSuffixes(req.body.wordNode);
  res.status(200).send(wordSuffixes);
}

function isWord(req, res, next) {
  var isWord = extendTrie.isWord(req.body.word);
  res.status(200).send(isWord);
}
