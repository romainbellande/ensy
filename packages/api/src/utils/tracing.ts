import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { TracingConfiguration } from '@api/configuration';
import { GraphQLInstrumentation } from '@opentelemetry/instrumentation-graphql';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';

export class Tracing extends NodeSDK {
  sdk: NodeSDK;

  constructor(configuration: TracingConfiguration) {
    if (configuration.enabled) {
      const jaegerExporter = new OTLPTraceExporter({
        url: configuration.url,
      });

      const traceExporter = jaegerExporter;

      super({
        resource: new Resource({
          [SemanticResourceAttributes.SERVICE_NAME]: `tog-api`,
        }),
        traceExporter,
        instrumentations: [
          new HttpInstrumentation(),
          new ExpressInstrumentation(),
          new NestInstrumentation(),
          new GraphQLInstrumentation(),
        ],
      });
    } else {
      super();
    }
  }
}
