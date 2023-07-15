import type { CodegenConfig } from '@graphql-codegen/cli';

const basedir = 'packages/client/src';

const config: CodegenConfig = {
  overwrite: true,
  ignoreNoDocuments: true, // for better experience with the watcher
  documents: [`${basedir}/**/*.tsx`],
  generates: {
    [`${basedir}/gql/`]: {
      schema: 'http://api.tog.localhost/graphql',
      preset: 'client',
    },
  },
};

export default config;
