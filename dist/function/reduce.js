"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reduceArray = void 0;
const reduceArray = (array) => {
    if (array?.length === 0)
        return 0;
    return array.reduce((a, b) => (a + b), 0);
};
exports.reduceArray = reduceArray;
