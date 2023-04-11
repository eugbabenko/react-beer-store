import * as winston from 'winston';

export function createConsoleLogger(
  loggerOptions?: winston.LoggerOptions,
): winston.Logger {
  loggerOptions = loggerOptions || {};

  return winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.Console({
        format: winston.format.json(),
      }),
    ],
    ...loggerOptions,
  });
}
