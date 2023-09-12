/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

import { AppModule } from './app/app.module';
import type { Configuration } from './configuration';
import { configuration } from './configuration';
import { Tracing } from './utils/tracing';

async function bootstrap() {
  const tracing = new Tracing(configuration().tracing);
  tracing.start();

  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const logger = app.get(Logger);

  app.useLogger(logger);

  const configService = app.get<ConfigService<Configuration>>(ConfigService);

  app.enableShutdownHooks();

  const port = configService.get('port');
  const host = configService.get('host');

  await app.listen(port, host);

  logger.log(`🚀 Api is running on: http://${host}:${port}/graphql`);
}

bootstrap();
