import type { LogLevel } from '@nestjs/common';
import * as Joi from 'joi';

export const validationSchema = Joi.object({
  API_DATABASE_URL: Joi.string()
    .uri({
      scheme: ['postgres'],
    })
    .required(),
  API_PORT: Joi.number().default(9000),
  API_ENV: Joi.string()
    .valid('development', 'uat', 'preproduction', 'production')
    .default('development'),
  NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),
  API_LOG_LEVEL: Joi.string()
    .valid('log', 'error', 'warn', 'debug', 'verbose')
    .default('log'),
  API_TRACING_URL: Joi.alternatives().conditional('API_TRACING_ENABLED', {
    is: true,
    then: Joi.string()
      .uri({ scheme: ['http', 'https'] })
      .required(),
    otherwise: Joi.string().uri({ scheme: ['http', 'https'] }),
  }),
  API_TRACING_ENABLED: Joi.boolean().default(false),
  API_HOST_URL: Joi.string().ip({ version: 'ipv4' }).default('0.0.0.0'),
  API_AUTH0_ISSUER: Joi.string().uri({ scheme: ['https'] }),
  API_AUTH0_CLIENT_ID: Joi.string().required(),
  API_AUTH0_CLIENT_SECRET: Joi.string().required(),
  API_SEEDS_USER_EMAIL: Joi.string().email().required(),
  API_SEEDS_USER_EXTERNAL_ID: Joi.string().required(),
});

export interface TracingConfiguration {
  url: string;
  enabled: boolean;
}

export interface Auth0Configuration {
  issuer: string;
  clientId: string;
  clientSecret: string;
}

export interface UserSeed {
  email: string;
  externalId: string;
}

export interface Seeds {
  user: UserSeed;
}

export interface Configuration {
  databaseUrl: string;
  port: number;
  host: string;
  isProduction: boolean;
  logLevel: LogLevel;
  tracing: TracingConfiguration;
  auth0: Auth0Configuration;
  seeds: Seeds;
}

export const configuration = (): Configuration => ({
  databaseUrl: process.env.API_DATABASE_URL,
  port: parseInt(process.env.API_PORT, 10),
  host: process.env.API_HOST_URL,
  isProduction: process.env['NODE' + '_ENV'] === 'production',
  logLevel: process.env['API_LOG_LEVEL'] as LogLevel,
  tracing: {
    url: process.env.API_TRACING_URL,
    enabled: process.env.API_TRACING_ENABLED === 'true',
  },
  auth0: {
    issuer: process.env.API_AUTH0_ISSUER,
    clientId: process.env.API_AUTH0_CLIENT_ID,
    clientSecret: process.env.API_AUTH0_CLIENT_SECRET,
  },
  seeds: {
    user: {
      email: process.env.API_SEEDS_USER_EMAIL,
      externalId: process.env.API_SEEDS_USER_EXTERNAL_ID,
    },
  },
});
