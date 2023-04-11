import { ArgumentsHost, Catch, HttpException, Inject } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request } from 'express';
import winston from 'winston';
import { RequestContext } from './request-context';
import { LOGGER_SERVICE } from './contansts';

@Catch()
export class ExceptionFilter extends BaseExceptionFilter {
  constructor(
    @Inject(LOGGER_SERVICE)
    private readonly loggerService: winston.Logger,
  ) {
    super();
  }

  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request: Request = ctx.getRequest();

    const endTime: any = new Date();
    let logParams: any = {
      duration: endTime - (RequestContext.getContext().startTime as any),
      path: request.path,
      stackTrace: exception.stack,
    };

    if (exception.response && exception.response.data) {
      logParams.responseData = exception.response.data;
    }

    const logLevel =
      exception instanceof HttpException && exception.getStatus() / 100 !== 5
        ? 'warn'
        : 'error';

    if (exception instanceof HttpException) {
      logParams = {
        ...logParams,
        statusCode: exception.getStatus(),
      };

      if (typeof exception.message === 'object') {
        logParams = { ...logParams, ...(exception.message as object) };
      } else {
        logParams.message = exception.message;
      }
    } else {
      logParams = {
        ...logParams,
        message: exception.message,
        statusCode: 500,
      };
    }

    this.loggerService[logLevel](logParams);

    super.catch(exception, host);
  }
}
