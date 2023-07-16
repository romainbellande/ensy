import { FindReferendumsQuery } from '@client/gql/generated';

export type FindReferendumNode =
  FindReferendumsQuery['referendums']['edges'][0]['node'];
