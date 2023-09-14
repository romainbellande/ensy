import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Auth0Configuration, Configuration } from '@/configuration';

import { Auth0Resolver } from './auth0.resolver';
import { Auth0Service } from './auth0.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: (configService: ConfigService<Configuration>) => {
        const { issuer } = configService.get<Auth0Configuration>('auth0');
        return {
          baseURL: issuer,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [Auth0Service, Auth0Resolver],
})
export class Auth0Module {}
