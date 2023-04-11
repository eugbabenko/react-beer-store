import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { tap } from 'rxjs/operators';
import winston from 'winston';
import { LOGGER_SERVICE } from './contansts';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @Inject(LOGGER_SERVICE)
    private readonly loggerService: winston.Logger,
  ) {}

  intercept(executionContext: ExecutionContext, next: CallHandler) {
    const startTime = new Date();

    const request: Request & { device: string } = executionContext
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

    return next.handle().pipe(
      tap((responseBody) => {
        const endTime = new Date();

        this.loggerService.info({
          message: `Response for ${request.path}`,
          endTime: endTime.toString(),
          duration: (endTime as any) - (startTime as any),
          path: request.path,
          responseBody,
          userAgent,
        });
      }),
    );
  }
}
