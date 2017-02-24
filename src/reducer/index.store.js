import { createStore } from 'redux';

import { ActionTypes } from './action-types.model';
import ItemService from '../index.service';

let defaultSize = 10;
let itemService = new ItemService();
let hiraganaItems = itemService.getHiraganaSplitItems(defaultSize);
let katakanaItems = itemService.getKatakanaSplitItems(defaultSize);
let items = itemService.getJoyoKanjiSplitItems(defaultSize);
let testDescription = false;
const defaultState = {
    currentIndex: 0,
    checkedTotal: 0,
    currentSplitItem: testDescription ? items[0] : null,
    showDescriptionDefault: testDescription ? true : false,
    showDescription: testDescription ? true : false,
    isShowList: testDescription ? false : true,
    isComplete: false,
    size: defaultSize,
    hiraganaSplit: hiraganaItems,
    katakanaSplit: katakanaItems,
    joyoKanjiSplit: items
};

function getNextTestIndex(state, incrementer) {
    let index = state.currentIndex;
    do {
        if (incrementer > 0) {
            index = index === (state.currentSplitItem.items.length - 1) ? 0 : index + incrementer;
        } else {
            index = index === 0 ? (state.currentSplitItem.items.length - 1) : index + incrementer;
        }
    }
    while (state.currentSplitItem.items[index].checked);
    return index;
}

function incrementTest(state, incrementer) {
    let index = getNextTestIndex(state, incrementer);
    return Object.assign({}, state, {
        showDescription: state.showDescriptionDefault,
        currentIndex: index,
        currentTest: state.currentSplitItem.items[index]
    });
}

function indexStore(state = defaultState, action) {
    switch (action.type) {
        case ActionTypes.checkTest:
            state.currentSplitItem.items[state.currentIndex].checked = action.isChecked;
            let checkedTotal = action.isChecked ? state.checkedTotal + 1 : state.checkedTotal - 1;
            let isComplete = checkedTotal === state.currentSplitItem.items.length;
            let nextTest = {
                checkedTotal: checkedTotal,
                isComplete: isComplete,
                currentSplitItem: state.currentSplitItem
            };
            if (!isComplete) {
                let index = getNextTestIndex(state, 1);
                nextTest.showDescription = state.showDescriptionDefault;
                nextTest.currentIndex = index;
                nextTest.currentTest = state.currentSplitItem.items[index];
            } else {
                state.currentSplitItem.reviewedTotal = state.currentSplitItem.reviewedTotal + 1;
                nextTest.currentSplitItem = state.currentSplitItem;
            }
            return Object.assign({}, state, nextTest);
        case ActionTypes.incrementTest:
            incrementTest(state, action.incrementer);
            break;
        case ActionTypes.navigateHome:
            return Object.assign({}, state, {
                isComplete: false,
                isShowList: true
            });
        case ActionTypes.reviewTestAgain:
            let currentSplitItem = Object.assign({}, state.currentSplitItem);
            currentSplitItem.items.forEach((item) => {
                item.checked = false;
            });
            return Object.assign({}, state, {
                currentSplitItem: currentSplitItem,
                currentIndex: 0,
                checkedTotal: 0,
                isComplete: false
            });
        case ActionTypes.startTest:
            action.splitItem.items.forEach((item) => {
                item.checked = false;
                item.showDescription = state.showDescriptionDefault;
            });
            let startState = {
                currentIndex: 0,
                checkedTotal: 0,
                showDescription: state.showDescriptionDefault,
                isComplete: false,
                isShowList: false,
                currentSplitItem: action.splitItem
            };
            startState.currentTest = startState.currentSplitItem.items[startState.currentIndex];
            return Object.assign({}, state, startState);
        case ActionTypes.testNext:
            return incrementTest(state, 1);
        case ActionTypes.testPrevious:
            return incrementTest(state, -1);
        case ActionTypes.testSizeChanged:
            if (action.size) {
                hiraganaItems = itemService.getHiraganaSplitItems(action.size);
                katakanaItems = itemService.getKatakanaSplitItems(action.size);
                items = itemService.getJoyoKanjiSplitItems(action.size);
                return Object.assign({}, state, {
                    size: action.size,
                    hiraganaSplit: hiraganaItems,
                    katakanaSplit: katakanaItems,
                    joyoKanjiSplit: items
                });
            } else {
                return state;
            }
        case ActionTypes.toggleDescription:
            return Object.assign({}, state, {
                showDescription: action.showDescription || !state.showDescription
            });
        case ActionTypes.updateDescription:
            return Object.assign({}, state, {
                showDescription: action.description,
                showDescriptionDefault: action.description
            });
        default:
            return state;
    }
}

export default createStore(indexStore);
