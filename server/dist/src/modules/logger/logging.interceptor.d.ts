import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import winston from 'winston';
export declare class LoggingInterceptor implements NestInterceptor {
    private readonly loggerService;
    constructor(loggerService: winston.Logger);
    intercept(executionContext: ExecutionContext, next: CallHandler): import("rxjs").Observable<any>;
}
