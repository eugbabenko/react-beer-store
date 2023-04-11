"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const winston_1 = require("winston");
const request_context_1 = require("./request-context");
const contansts_1 = require("./contansts");
let ExceptionFilter = class ExceptionFilter extends core_1.BaseExceptionFilter {
    constructor(loggerService) {
        super();
        this.loggerService = loggerService;
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const endTime = new Date();
        let logParams = {
            duration: endTime - request_context_1.RequestContext.getContext().startTime,
            path: request.path,
            stackTrace: exception.stack,
        };
        if (exception.response && exception.response.data) {
            logParams.responseData = exception.response.data;
        }
        const logLevel = exception instanceof common_1.HttpException && exception.getStatus() / 100 !== 5
            ? 'warn'
            : 'error';
        if (exception instanceof common_1.HttpException) {
            logParams = Object.assign(Object.assign({}, logParams), { statusCode: exception.getStatus() });
            if (typeof exception.message === 'object') {
                logParams = Object.assign(Object.assign({}, logParams), exception.message);
            }
            else {
                logParams.message = exception.message;
            }
        }
        else {
            logParams = Object.assign(Object.assign({}, logParams), { message: exception.message, statusCode: 500 });
        }
        this.loggerService[logLevel](logParams);
        super.catch(exception, host);
    }
};
ExceptionFilter = __decorate([
    (0, common_1.Catch)(),
    __param(0, (0, common_1.Inject)(contansts_1.LOGGER_SERVICE)),
    __metadata("design:paramtypes", [winston_1.default.Logger])
], ExceptionFilter);
exports.ExceptionFilter = ExceptionFilter;
//# sourceMappingURL=exception.filter.js.map