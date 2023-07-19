interface Configuration {
  graphqlEndpoint: string;
}

export const configuration: Configuration = {
  graphqlEndpoint: import.meta.env.VITE_GRAPHQL_ENDPOINT || '',
};

console.log('configuration :>> ', configuration);
