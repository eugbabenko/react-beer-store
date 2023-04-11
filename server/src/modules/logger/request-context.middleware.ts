import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

import { RequestContext } from './request-context';

/**
 * Associate a unique identifier with incoming requests by adding a unique "correlationID" attribute
 * on the Request object.
 *
 * Using the newly created "correlationID" we are able to associate events that occur during on the
 * processing of a request.
 *
 * @remarks Use this middleware at the beginning of a middleware chain.
 * @remarks You must include a "correlationID" field on all logs created and exceptions thrown
 *          by your code.
 */
@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    const correlationID = request.header('X-Correlation-ID') || uuid();
    RequestContext.setContext(correlationID, request, response);
    next();
  }
}
