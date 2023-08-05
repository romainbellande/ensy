import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  Configuration,
  configuration,
  validationSchema,
} from '@api/configuration';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { UserModule } from '@api/app/modules/user/user.module';
import { LoggerModule } from 'nestjs-pino';
import { pinoLoggerFactory } from '@api/utils';
import { ReferendumModule } from './modules/referendum/referendum.module';
import { APP_GUARD } from '@nestjs/core';
import { Auth0Guard } from '@api/guards';

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
