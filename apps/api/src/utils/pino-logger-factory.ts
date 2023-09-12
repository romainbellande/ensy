import type { LogLevel } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';
import type { Params } from 'nestjs-pino';
import type { Level } from 'pino';

import type { Configuration } from '@/configuration';

const levelMapper: Record<LogLevel, Level> = {
  verbose: 'trace',
  debug: 'debug',
  log: 'info',
  warn: 'warn',
  error: 'error',
};

export const pinoLoggerFactory = (
  configService: ConfigService<Configuration>,
): Params => {
  const logLevel = configService.get('logLevel');

  return {
    pinoHttp: {
      autoLogging: logLevel === 'verbose',
      quietReqLogger: logLevel !== 'verbose',
      useLevel: levelMapper[logLevel],
      transport: !configService.get('isProduction')
        ? { target: 'pino-pretty' }
        : undefined,
    },
  };
};

const coreLevels: LogLevel[] = ['verbose', 'debug', 'log', 'warn', 'error'];

export const getLogLevels = (logLevel: LogLevel): LogLevel[] => {
  const startIndex = coreLevels.findIndex((value) => value === logLevel);
  return coreLevels.slice(startIndex);
};
