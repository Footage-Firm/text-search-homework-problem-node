
class TextTokenizer {

    constructor(input, regexStr) {
        this._regexStr = regexStr;
        this._regex = RegExp(regexStr, 'g');
        this._input = input;
        this._nextWord = null;
        this._nextPunctuation = null;
        this._prevWordEndIndex = 0;
    }

    _fetchNext() {
        if (this._regex === null) {
            return; // exec function will start over after hitting null once, so trip this function to stop
        }

        const nextWordMatch = this._regex.exec(this._input);

        if (nextWordMatch !== null) {
            this._nextWord = nextWordMatch[0];
            const endOfWordIndex = this._regex.lastIndex;
            const startOfWordIndex = endOfWordIndex - this._nextWord.length;
            if (startOfWordIndex > this._prevWordEndIndex) {
                this._nextPunctuation = this._input.slice(this._prevWordEndIndex, startOfWordIndex);
            }
            this._prevWordEndIndex = startOfWordIndex + this._nextWord.length;
        } else {
            if (this._prevWordEndIndex < this._input.length) {
                this._nextPunctuation = this._input.slice(this._prevWordEndIndex, this._input.length);
                this._prevWordEndIndex = this._input.length;
            }
            this._regex = null;
        }

    }

    /**
     * @returns boolean
     */
    hasNext() {
        if (this._nextWord === null && this._nextPunctuation === null) {
            this._fetchNext();
        }
        return (this._nextPunctuation !== null || this._nextWord !== null);
    }

    /**
     * @returns string|null
     */
    next() {
        if (this._nextWord === null && this._nextPunctuation === null) {
            this._fetchNext();
        }

        let result;
        if (this._nextPunctuation !== null) {
            result = this._nextPunctuation;
            this._nextPunctuation = null;
        } else {
            result = this._nextWord;
            this._nextWord = null;
        }
        return result;
    }

    /**
     * @param {string} str
     * @returns boolean
     */
    isWord(str) {
        const matches = str.match(new RegExp(this._regexStr));
        if (!matches) {
            return false;
        }
        return str === matches[0]
    }

}

module.exports = TextTokenizer;