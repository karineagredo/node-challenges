function splitWordsPascalCase(wordsArray) {
  const words = wordsArray.map((word) => {
    if (!isNaN(word.charAt(0))) {
      // if it is a number return word because PascalCase can't start with number
      return word;
    }
    // TODO: confirm the definition of camelCase. The example given (BrownFox) seems to be PascalCase
    // hence this implementation
    if (word.charAt(0).toUpperCase() !== word.charAt(0)) {
      return word; // return word if it doesn't start with an Uppercase.
    }
    var upperCaseNumber = 0;
    word
      .split('')
      .forEach((character) =>
        character.toUpperCase() === character ? upperCaseNumber++ : null
      );
    if (upperCaseNumber <= 1) {
      return word;
    }
    const splitPascalCaseWord = word.split('').splice(0, upperCaseNumber);
    return splitPascalCaseWord;
  });
  return words.flat();
}

module.exports = splitWordsPascalCase;
