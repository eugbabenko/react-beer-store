import { ContinuationLocalStorage } from 'asyncctx';
import express from 'express';
export declare class RequestContext {
    static getContext(): RequestContext;
    static setContext(correlationID: string, request: express.Request, response: express.Response): void;
    static readonly cls: ContinuationLocalStorage<RequestContext>;
    readonly id: string;
    readonly request: express.Request;
    readonly response: express.Response;
    readonly startTime: Date;
    private constructor();
}
