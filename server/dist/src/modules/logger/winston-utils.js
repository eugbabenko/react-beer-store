"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConsoleLogger = void 0;
const winston = require("winston");
function createConsoleLogger(loggerOptions) {
    loggerOptions = loggerOptions || {};
    return winston.createLogger(Object.assign({ level: 'info', format: winston.format.json(), transports: [
            new winston.transports.Console({
                format: winston.format.json(),
            }),
        ] }, loggerOptions));
}
exports.createConsoleLogger = createConsoleLogger;
//# sourceMappingURL=winston-utils.js.map