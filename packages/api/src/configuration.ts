import * as Joi from 'joi';
import { Level } from 'pino';

export const validationSchema = Joi.object({
  NX_DATABASE_URL: Joi.string()
    .uri({
      scheme: ['postgres'],
    })
    .required(),
  NX_PORT: Joi.number().default(9000),
  NX_ENV: Joi.string()
    .valid('development', 'uat', 'preproduction', 'production')
    .default('development'),
  NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),
  NX_LOG_LEVEL: Joi.string()
    .valid('fatal', 'error', 'warn', 'info', 'debug', 'trace')
    .default('info'),
  NX_TRACING_URL: Joi.alternatives().conditional('NX_TRACING_ENABLED', {
    is: true,
    then: Joi.string()
      .uri({ scheme: ['http', 'https'] })
      .required(),
    otherwise: Joi.string().uri({ scheme: ['http', 'https'] }),
  }),
  NX_TRACING_ENABLED: Joi.boolean().default(false),
  NX_HOST_URL: Joi.string().ip({ version: 'ipv4' }).default('0.0.0.0'),
});

export interface TracingConfiguration {
  url: string;
  enabled: boolean;
}

export interface Configuration {
  databaseUrl: string;
  port: number;
  host: string;
  isProduction: boolean;
  logLevel: Level;
  tracing: TracingConfiguration;
}

export const configuration = (): Configuration => ({
  databaseUrl: process.env.NX_DATABASE_URL,
  port: parseInt(process.env.NX_PORT, 10),
  host: process.env.NX_HOST_URL,
  isProduction: process.env['NODE' + '_ENV'] === 'production',
  logLevel: process.env['NX_LOG_LEVEL'] as Level,
  tracing: {
    url: process.env.NX_TRACING_URL,
    enabled: process.env.NX_TRACING_ENABLED === 'true',
  },
});
