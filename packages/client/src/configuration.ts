interface Configuration {
  graphqlEndpoint: string;
}

export const configuration: Configuration = {
  graphqlEndpoint: process.env.NX_GRAPHQL_ENDPOINT || '',
};
