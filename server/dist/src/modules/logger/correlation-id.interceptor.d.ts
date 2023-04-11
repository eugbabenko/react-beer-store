import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
export declare class CorrelationIDInterceptor implements NestInterceptor {
    intercept(executionContext: ExecutionContext, next: CallHandler): import("rxjs").Observable<any>;
}
