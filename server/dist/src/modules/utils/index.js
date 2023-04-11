"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripNumber = void 0;
const stripNumber = (numberToStrip) => {
    return parseFloat(parseFloat(String(numberToStrip)).toFixed(2));
};
exports.stripNumber = stripNumber;
//# sourceMappingURL=index.js.map