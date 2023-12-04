"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomStr = void 0;
const base62 = require("base62");
function generateRandomStr(len) {
    let str = '';
    for (let i = 0; i < len; i++) {
        const num = Math.floor(Math.random() * 62);
        str += base62.encode(num);
    }
    return str;
}
exports.generateRandomStr = generateRandomStr;
//# sourceMappingURL=utils.js.map