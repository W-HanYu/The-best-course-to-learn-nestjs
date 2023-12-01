"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = async () => {
    const dbPort = await 3306;
    return {
        port: parseInt(process.env.PORT, 10) || 3000,
        db: {
            host: 'localhost',
            port: dbPort,
        },
    };
};
//# sourceMappingURL=config.js.map