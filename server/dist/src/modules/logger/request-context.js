"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestContext = void 0;
const asyncctx_1 = require("asyncctx");
class RequestContext {
    static getContext() {
        return RequestContext.cls.getContext();
    }
    static setContext(correlationID, request, response) {
        RequestContext.cls.setContext(new RequestContext(correlationID, request, response));
    }
    constructor(correlationID, request, response) {
        this.id = correlationID;
        this.request = request;
        this.response = response;
        this.startTime = new Date();
    }
}
exports.RequestContext = RequestContext;
RequestContext.cls = new asyncctx_1.ContinuationLocalStorage();
RequestContext.cls.setRootContext({});
//# sourceMappingURL=request-context.js.map