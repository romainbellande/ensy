import type { CodegenConfig } from '@graphql-codegen/cli';

const basedir = 'packages/client/src';

const config: CodegenConfig = {
  overwrite: true,
  ignoreNoDocuments: true, // for better experience with the watcher
  documents: [`${basedir}/**/*.ts`],
  generates: {
    [`${basedir}/gql/`]: {
      schema: 'http://127.0.0.1:8086/graphql',
      preset: 'client',
    },
  },
};

export default config;
