import { ContinuationLocalStorage } from 'asyncctx';
import express from 'express';

export class RequestContext {
  static getContext() {
    return RequestContext.cls.getContext()!;
  }

  static setContext(
    correlationID: string,
    request: express.Request,
    response: express.Response,
  ) {
    RequestContext.cls.setContext(
      new RequestContext(correlationID, request, response),
    );
  }

  public static readonly cls = new ContinuationLocalStorage<RequestContext>();

  readonly id: string;
  readonly request: express.Request;
  readonly response: express.Response;
  readonly startTime: Date;

  private constructor(
    correlationID: string,
    request: express.Request,
    response: express.Response,
  ) {
    this.id = correlationID;
    this.request = request;
    this.response = response;
    this.startTime = new Date();
  }
}

RequestContext.cls.setRootContext({} as any);
