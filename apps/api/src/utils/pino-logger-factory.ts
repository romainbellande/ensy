import { Configuration } from '@/configuration';
import { LogLevel } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Params } from 'nestjs-pino';
import { Level } from 'pino';

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
