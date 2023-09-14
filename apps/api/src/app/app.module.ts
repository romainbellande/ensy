import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import type { ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';

import type { Configuration } from '@/configuration';
import { configuration, validationSchema } from '@/configuration';
import { Auth0Guard } from '@/guards';
import { pinoLoggerFactory } from '@/utils';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  Auth0Module,
  CommandsModule,
  ReferendumModule,
  ReferendumVoteModule,
  UserModule,
} from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema,
      isGlobal: true,
      load: [configuration],
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: pinoLoggerFactory,
      inject: [ConfigService],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<Configuration>) => ({
        type: 'postgres',
        url: configService.get('databaseUrl'),
        autoLoadEntities: true,
        synchronize: true,
        logging: configService.get('logLevel'),
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      introspection: true,
      sortSchema: true,
    }),
    UserModule,
    ReferendumModule,
    ReferendumVoteModule,
    CommandsModule,
    Auth0Module,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: Auth0Guard,
    },
  ],
})
export class AppModule {}
