
const TextTokenizer = require('./TextTokenizer');

class TextSearcher {

    /**
     *  Initializes any internal data structures that are needed for
     *  this class to implement search efficiently.
     *
     *  @param {string} corpus
     */
    constructor(corpus) {
        // TODO -- fill in implementation
    }

    /**
     * @param {string} queryWord - The word to search for in the file contents.
     * @param {int} contextWords - The number of words of context to provide on each side of the query word.
     * @returns string[] - One context string for each time the query word appears in the file.
     */
    search(queryWord, contextWords) {
        // TODO -- fill in implementation
        return [];
    }

}

module.exports = TextSearcher;