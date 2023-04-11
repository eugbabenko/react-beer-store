import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { RequestContext } from './request-context';

@Injectable()
export class CorrelationIDInterceptor implements NestInterceptor {
  intercept(executionContext: ExecutionContext, next: CallHandler) {
    if (executionContext.getType() === 'rpc') {
      // express middlewares aren't called in microservices
      // hence RequestContext is undefined here
      // so let's fix this

      const requestContext = RequestContext.getContext();
      if (!requestContext || !requestContext.id) {
        const rpcContext = executionContext.switchToRpc();
        const message = rpcContext.getData();
        const headers: Record<string, any> = message?.headers ?? {};

        const correlationIdsFromHeaders: string[] | string | undefined =
          headers['X-Correlation-ID'];

        const correlationId = Array.isArray(correlationIdsFromHeaders)
          ? correlationIdsFromHeaders[0]
          : correlationIdsFromHeaders ?? uuid();

        RequestContext.setContext(correlationId, message as any, null as any);
      }
    }

    return next.handle();
  }
}
