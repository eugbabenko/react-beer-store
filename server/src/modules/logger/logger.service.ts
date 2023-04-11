import * as winston from 'winston';
import { createConsoleLogger } from './winston-utils';
import { RequestContext } from './request-context';
import { LOGGER_SERVICE } from './contansts';

export const LoggerService = {
  provide: LOGGER_SERVICE,
  useFactory: () => {
    const winstonCorrelationIDFormat = winston.format((info) => {
      info.correlationID = RequestContext.getContext().id;
      return info;
    });

    return createConsoleLogger({
      format: winston.format.combine(
        winstonCorrelationIDFormat(),
        winston.format.json(),
      ),
    });
  },
};
