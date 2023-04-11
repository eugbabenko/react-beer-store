import * as winston from 'winston';
export declare const LoggerService: {
    provide: string;
    useFactory: () => winston.Logger;
};
