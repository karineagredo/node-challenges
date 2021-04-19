const { Transform } = require('stream');
const splitWordsPascalCase = require('./splitPascal.js');
const inherits = require('util').inherits;

/**
 * Program to find the number of words in a given text.
 * Specific requirements are written in the README file.
 * Question: One of the requirements is to treat camelCase words differently. However,
 * the example gives a PascalCase. Please define exactly what camelCase is.
 * @author Karine Agredo
 */
function WordCounter() {
  Transform.call(this, { objectMode: true });
}
var lines = 0;
var words = 0;
var quotedWords = 0;
var unquotedWords = 0;
var unquotedWordsNoSpecialCharacter;
var regExp = /(")([^"]*(")+)/g; // finds only quoted words

inherits(WordCounter, Transform);

WordCounter.prototype._transform = function (chunk, enc, next) {
  var quotedTokens = chunk.toString().match(regExp); // returns null if there are no matches
  quotedWords = quotedTokens ? quotedTokens.length : 0;

  var unquotedWordsTokens = chunk.split(' ');

  if (unquotedWordsTokens) {
    unquotedWordsNoSpecialCharacter = unquotedWordsTokens.filter(
      (word) => word.match(/(_)+|(\W)/g) === null // returns the word only if it doesn't contain special characters
    );
    unquotedWords = splitWordsPascalCase(unquotedWordsNoSpecialCharacter)
      .length;
  }

  words = unquotedWords - quotedWords;
  lines = chunk.toString().split(/\r?\n/).length;

  next();
};

WordCounter.prototype._flush = function (cb) {
  this.push({ words, lines });
  cb();
};

module.exports = WordCounter;
