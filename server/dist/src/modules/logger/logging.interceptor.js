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
exports.LoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const winston_1 = require("winston");
const contansts_1 = require("./contansts");
let LoggingInterceptor = class LoggingInterceptor {
    constructor(loggerService) {
        this.loggerService = loggerService;
    }
    intercept(executionContext, next) {
        const startTime = new Date();
        const request = executionContext
            .switchToHttp()
            .getRequest();
        const userAgent = request.header('user-agent');
        if (request.path.startsWith('/version')) {
            return next.handle();
        }
        this.loggerService.info({
            message: `Request to ${request.path}`,
            startTime: startTime.toString(),
            device: request.device,
            path: request.path,
            params: request.params,
            query: request.query,
            data: request.body,
            userAgent,
        });
        return next.handle().pipe((0, operators_1.tap)((responseBody) => {
            const endTime = new Date();
            this.loggerService.info({
                message: `Response for ${request.path}`,
                endTime: endTime.toString(),
                duration: endTime - startTime,
                path: request.path,
                responseBody,
                userAgent,
            });
        }));
    }
};
LoggingInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(contansts_1.LOGGER_SERVICE)),
    __metadata("design:paramtypes", [winston_1.default.Logger])
], LoggingInterceptor);
exports.LoggingInterceptor = LoggingInterceptor;
//# sourceMappingURL=logging.interceptor.js.map