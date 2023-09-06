import { GraphQLClient } from 'graphql-request';
import { PUBLIC_GRAPHQL_ENDPOINT } from '$env/static/public';
import { getSdk } from './gql';
import { auth0 } from '@/lib/auth0';

const graphqlClient = new GraphQLClient(PUBLIC_GRAPHQL_ENDPOINT, {
  async requestMiddleware(request) {
    const accessToken = await auth0.getTokenSilently();

    return {
      ...request,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    };
  }
});

export const client = getSdk(graphqlClient);
