import type { CodegenConfig } from '@graphql-codegen/cli';

const basedir = 'packages/client/src';

const config: CodegenConfig = {
  overwrite: true,
  ignoreNoDocuments: true, // for better experience with the watcher
  documents: [`${basedir}/operations/**/*.ts`],
  generates: {
    [`${basedir}/gql/generated.ts`]: {
      schema: 'http://127.0.0.1:8086/graphql',
      // preset: 'client',
      config: {
        scalars: {
          DateTime: {
            input: 'Date',
            output: 'Date',
          },
          ConnectionCursor: {
            input: 'string',
            output: 'string',
          },
        },
        fetcher: {
          endpoint: 'configuration.graphqlEndpoint',
          fetchParams: {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        },
      },
      plugins: [
        {
          add: {
            content: "import { configuration } from '@client/configuration';",
          },
        },
        'typescript',
        'typescript-operations',
        'typescript-react-query',
      ],
    },
  },
};

export default config;
