import { useCallback } from 'react';
import { GraphQLClient, Variables } from 'graphql-request';
import { configuration } from '@client/configuration';
import { RequestDocument } from 'graphql-request';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { VariablesAndRequestHeadersArgs } from 'graphql-request/build/esm/types';

export const graphqlClient = new GraphQLClient(configuration.graphqlEndpoint, {
  headers: { 'Content-Type': 'application/json' },
});

export const useGraphqlRequest = () => {
  return useCallback(
    <
      TDocument extends RequestDocument,
      TVariables extends Variables = Variables,
    >(
      document: RequestDocument | TypedDocumentNode<TDocument, TVariables>,
      ...variables: VariablesAndRequestHeadersArgs<TVariables>
    ) => {
      return graphqlClient.request<TDocument, TVariables>(
        document,
        ...variables
      );
    },
    []
  );
};
