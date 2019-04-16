const expect = require('chai').expect;
const TextTokenizer = require('../TextTokenizer');

// Note, these should always pass!!!

describe('TestTokenizer', () => {
    describe('next', () => {
        it('Should work', () => {
            var str1 = "123, 789: def";
            var regex1 = "[0-9]+";
            const tokenizer = new TextTokenizer(str1, regex1);

            expect(tokenizer.next()).to.equal('123');
            expect(tokenizer.hasNext()).to.be.true;
            expect(tokenizer.next()).to.equal(', ');
            expect(tokenizer.hasNext()).to.be.true;
            expect(tokenizer.next()).to.equal('789');
            expect(tokenizer.hasNext()).to.be.true;
            expect(tokenizer.next()).to.equal(': def');
            expect(tokenizer.hasNext()).to.be.false;
        });
    });

    describe('isWord', () => {
        it('Should work', () => {
            var str1 = "123, 789: def";
            var regex1 = "[0-9]+";
            const tokenizer = new TextTokenizer(str1, regex1);

            expect(tokenizer.isWord('1029384')).to.be.true;
            expect(tokenizer.isWord('1029388 ')).to.be.false;
            expect(tokenizer.isWord('123,456')).to.be.false;
        })
    })
});