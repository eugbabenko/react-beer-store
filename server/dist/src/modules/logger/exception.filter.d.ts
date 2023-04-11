import { ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import winston from 'winston';
export declare class ExceptionFilter extends BaseExceptionFilter {
    private readonly loggerService;
    constructor(loggerService: winston.Logger);
    catch(exception: any, host: ArgumentsHost): void;
}
