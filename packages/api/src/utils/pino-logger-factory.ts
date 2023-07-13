import { Configuration } from '@api/configuration';
import { ConfigService } from '@nestjs/config';
import { Params } from 'nestjs-pino';

export const pinoLoggerFactory = (
  configService: ConfigService<Configuration>
): Params => ({
  pinoHttp: {
    autoLogging: configService.get('isProduction'),
    quietReqLogger: !configService.get('isProduction'),
    level: configService.get('logLevel'),
    transport: !configService.get('isProduction')
      ? { target: 'pino-pretty' }
      : undefined,
  },
});
