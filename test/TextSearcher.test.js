const expect = require('chai').expect;
const fs = require('fs');
const path = require('path');
const TextSearcher = require('../TextSearcher');

function expectArraysEqual(arr1, arr2) {
    expect(arr1).to.exist;
    expect(arr2).to.exist;
    expect(arr1.length).to.equal(arr2.length);

    for (let i=0; i<arr1.length; i++) {
        expect(arr1[i]).to.equal(arr2[i]);
    }
}

describe('TestSearcher', () => {
    describe('search', () => {
        it('should work - OneHitNoContext', () => {
            const fileContents = fs.readFileSync(path.join(__dirname, '../files/short_excerpt.txt')).toString();
            const searcher = new TextSearcher(fileContents);
            const results = searcher.search("sketch", 0);
            expectArraysEqual(results, ['sketch']);
        });

        it('should work - MultipleHitsNoContext', () => {
            const fileContents = fs.readFileSync(path.join(__dirname, '../files/short_excerpt.txt')).toString();
            const searcher = new TextSearcher(fileContents);
            const results = searcher.search("naturalists", 0);
            expectArraysEqual(results, ['naturalists','naturalists']);
        });

        it('should work - BasicSearch', () => {
            const fileContents = fs.readFileSync(path.join(__dirname, '../files/short_excerpt.txt')).toString();
            const searcher = new TextSearcher(fileContents);
            const results = searcher.search("naturalists", 3);
            expectArraysEqual(results, [
                "great majority of naturalists believed that species",
                "authors.  Some few naturalists, on the other"
            ]);
        });

        it('should work - ApostropheQuery', () => {
            const fileContents = fs.readFileSync(path.join(__dirname, '../files/long_excerpt.txt')).toString();
            const searcher = new TextSearcher(fileContents);
            const results = searcher.search("animal's", 4);
            expectArraysEqual(results, [
                "not indeed to the animal's or plant's own good",
                "habitually speak of an animal's organisation as\r\nsomething plastic"
            ]);
        });

        it('should work - NumericQuery', () => {
            const fileContents = fs.readFileSync(path.join(__dirname, '../files/long_excerpt.txt')).toString();
            const searcher = new TextSearcher(fileContents);
            const results = searcher.search("1844", 2);
            expectArraysEqual(results, [
                "enlarged in 1844 into a",
                "sketch of 1844--honoured me"
            ]);
        });

        it('should work - MixedQuery', () => {
            const fileContents = fs.readFileSync(path.join(__dirname, '../files/long_excerpt.txt')).toString();
            const searcher = new TextSearcher(fileContents);
            const results = searcher.search("xxxxx10x", 3);
            expectArraysEqual(results, [
                "date first edition [xxxxx10x.xxx] please check"
            ]);
        });

        it('should work - CaseInsensitiveSearch', () => {
            const fileContents = fs.readFileSync(path.join(__dirname, '../files/short_excerpt.txt')).toString();
            const searcher = new TextSearcher(fileContents);

            const expectedResults = [
                "on the Origin of Species.  Until recently the great",
                "of naturalists believed that species were immutable productions, and",
                "hand, have believed that species undergo modification, and that"
            ];

            const resultsUpper = searcher.search("SPECIES", 4);
            expectArraysEqual(resultsUpper, expectedResults);

            const resultsMixed = searcher.search("SpEcIeS", 4);
            expectArraysEqual(resultsMixed, expectedResults);
        });

        it('should work - NearBeginning', () => {
            const fileContents = fs.readFileSync(path.join(__dirname, '../files/short_excerpt.txt')).toString();
            const searcher = new TextSearcher(fileContents);
            const results = searcher.search("here", 4);
            expectArraysEqual(results, [
                "I will here give a brief sketch"
            ]);
        });

        it('should work - NearEnd', () => {
            const fileContents = fs.readFileSync(path.join(__dirname, '../files/short_excerpt.txt')).toString();
            const searcher = new TextSearcher(fileContents);
            const results = searcher.search("existing", 3);
            expectArraysEqual(results, [
                "and that the existing forms of life",
                "generation of pre existing forms."
            ]);
        });

        it('should work - MultipleSearches', () => {
            const fileContents = fs.readFileSync(path.join(__dirname, '../files/short_excerpt.txt')).toString();
            const searcher = new TextSearcher(fileContents);

            const results = searcher.search("species", 4);
            expectArraysEqual(results, [
                "on the Origin of Species.  Until recently the great",
                "of naturalists believed that species were immutable productions, and",
                "hand, have believed that species undergo modification, and that"
            ]);

            const results2 = searcher.search("here", 4);
            expectArraysEqual(results2, ["I will here give a brief sketch"]);

            const results3 = searcher.search("existing", 3);
            expectArraysEqual(results3, [
                "and that the existing forms of life",
                "generation of pre existing forms."
            ])
        });

        it('should work - OverlappingHits', () => {
            const fileContents = fs.readFileSync(path.join(__dirname, '../files/short_excerpt.txt')).toString();
            const searcher = new TextSearcher(fileContents);
            const results = searcher.search("that", 3);
            expectArraysEqual(results, [
                "of naturalists believed that species were immutable",
                "hand, have believed that species undergo modification",
                "undergo modification, and that the existing forms"
            ]);
        });

        it('should work - NoHits', () => {
            const fileContents = fs.readFileSync(path.join(__dirname, '../files/short_excerpt.txt')).toString();
            const searcher = new TextSearcher(fileContents);
            const results = searcher.search("slejrlskejrlkajlsklejrlksjekl", 3);
            expectArraysEqual(results, []);
        });

        it('should work - NoHits', () => {
            const fileContents = fs.readFileSync(path.join(__dirname, '../files/short_excerpt.txt')).toString();
            const searcher = new TextSearcher(fileContents);
            const results = searcher.search("slejrlskejrlkajlsklejrlksjekl", 3);
            expectArraysEqual(results, []);
        });
    })
});