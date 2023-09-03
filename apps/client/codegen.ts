import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://127.0.0.1:8086/graphql',
  documents: 'src/lib/graphql/**/*.graphql',
  generates: {
    'src/lib/graphql/gql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-graphql-request'],
      config: {
        rawRequest: false,
        scalars: {
          DateTime: {
            input: 'Date',
            output: 'Date'
          },
          ConnectionCursor: {
            input: 'string',
            output: 'string'
          }
        }
      }
    }
  }
};

export default config;
