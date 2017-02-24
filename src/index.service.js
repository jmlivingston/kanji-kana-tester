let joyoKanji = require('../data/joyo-kanji.json');
let hiragana = require('../data/hiragana.json');
let katakana = require('../data/katakana.json');

export default class ItemService {
    joyoKanjiItems = joyoKanji.sort(function (x, y) { return x.grade - y.grade || x.strokes - y.strokes; });

    constructor() { }

    getSplitItems(size, itemsCopy) {
        let splitItems = [];
        if (size < itemsCopy.length) {
            while (itemsCopy.length > 0) {
                splitItems.push({
                    reviewedTotal: 0,
                    items: itemsCopy.splice(0, size)
                });
            }
        } else {
            splitItems.push({
                reviewedTotal: 0,
                items: itemsCopy
            });
        }
        return splitItems;
    }

    getJoyoKanjiSplitItems(size) {
        return this.getSplitItems(size, this.joyoKanjiItems.slice(0));
    }

    getHiraganaSplitItems(size) {
        return this.getSplitItems(size, hiragana.slice(0));
    }

    getKatakanaSplitItems(size) {
        return this.getSplitItems(size, katakana.slice(0));
    }
}
