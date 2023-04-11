"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerService = void 0;
const winston = require("winston");
const winston_utils_1 = require("./winston-utils");
const request_context_1 = require("./request-context");
const contansts_1 = require("./contansts");
exports.LoggerService = {
    provide: contansts_1.LOGGER_SERVICE,
    useFactory: () => {
        const winstonCorrelationIDFormat = winston.format((info) => {
            info.correlationID = request_context_1.RequestContext.getContext().id;
            return info;
        });
        return (0, winston_utils_1.createConsoleLogger)({
            format: winston.format.combine(winstonCorrelationIDFormat(), winston.format.json()),
        });
    },
};
//# sourceMappingURL=logger.service.js.map