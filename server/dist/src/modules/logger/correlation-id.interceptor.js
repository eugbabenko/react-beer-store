"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorrelationIDInterceptor = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const request_context_1 = require("./request-context");
let CorrelationIDInterceptor = class CorrelationIDInterceptor {
    intercept(executionContext, next) {
        var _a;
        if (executionContext.getType() === 'rpc') {
            const requestContext = request_context_1.RequestContext.getContext();
            if (!requestContext || !requestContext.id) {
                const rpcContext = executionContext.switchToRpc();
                const message = rpcContext.getData();
                const headers = (_a = message === null || message === void 0 ? void 0 : message.headers) !== null && _a !== void 0 ? _a : {};
                const correlationIdsFromHeaders = headers['X-Correlation-ID'];
                const correlationId = Array.isArray(correlationIdsFromHeaders)
                    ? correlationIdsFromHeaders[0]
                    : correlationIdsFromHeaders !== null && correlationIdsFromHeaders !== void 0 ? correlationIdsFromHeaders : (0, uuid_1.v4)();
                request_context_1.RequestContext.setContext(correlationId, message, null);
            }
        }
        return next.handle();
    }
};
CorrelationIDInterceptor = __decorate([
    (0, common_1.Injectable)()
], CorrelationIDInterceptor);
exports.CorrelationIDInterceptor = CorrelationIDInterceptor;
//# sourceMappingURL=correlation-id.interceptor.js.map