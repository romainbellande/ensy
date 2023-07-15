import { graphql } from '@client/gql/gql';

export const findReferendums = graphql(`
  query FindReferendums {
    referendums {
      edges {
        node {
          answers
          createdAt
          description
          endDate
          id
          name
          startDate
          slug
        }
      }
    }
  }
`);
