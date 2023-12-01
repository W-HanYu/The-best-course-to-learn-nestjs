"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("fs/promises");
const yaml = require("js-yaml");
const path_1 = require("path");
exports.default = async () => {
    const configFilePath = (0, path_1.join)(process.cwd(), 'aaa.yaml');
    const config = await (0, promises_1.readFile)(configFilePath, {
        encoding: 'utf-8',
    });
    return yaml.load(config);
};
//# sourceMappingURL=config2.js.map