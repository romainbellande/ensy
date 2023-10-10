import type { FindReferendumsQuery } from '../graphql/gql';

export type Referendum = FindReferendumsQuery['referendums']['edges'][0]['node'];
