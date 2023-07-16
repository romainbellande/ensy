import { graphql } from '@client/gql/gql';

graphql(`
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
