import type { GraphQLClient } from 'graphql-request';
import type { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  ConnectionCursor: { input: string; output: string };
  DateTime: { input: Date; output: Date };
};

export type AddVotesToReferendumInput = {
  /** The id of the record. */
  id: Scalars['ID']['input'];
  /** The ids of the relations. */
  relationIds: Array<Scalars['ID']['input']>;
};

export type CreateManyReferendumVotesInput = {
  /** Array of records to create */
  referendumVotes: Array<CreateReferendumVote>;
};

export type CreateManyReferendumsInput = {
  /** Array of records to create */
  referendums: Array<CreateReferendum>;
};

export type CreateManyUsersInput = {
  /** Array of records to create */
  users: Array<CreateUser>;
};

export type CreateOneReferendumInput = {
  /** The record to create */
  referendum: CreateReferendum;
};

export type CreateOneReferendumVoteInput = {
  /** The record to create */
  referendumVote: CreateReferendumVote;
};

export type CreateOneUserInput = {
  /** The record to create */
  user: CreateUser;
};

export type CreateReferendum = {
  /** referendum answer kind */
  answerKind: ReferendumAnswerKind;
  answers?: Array<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endDate: Scalars['DateTime']['input'];
  name: Scalars['String']['input'];
  participantsExternalIds?: Array<Scalars['String']['input']>;
  /** referendum participants */
  participantsKind: ReferendumParticipantsKind;
  participantsRoles?: Array<Scalars['String']['input']>;
  question: Scalars['String']['input'];
  slug: Scalars['String']['input'];
  /** starting date */
  startDate?: Scalars['DateTime']['input'];
};

export type CreateReferendumVote = {
  agree?: InputMaybe<Scalars['Boolean']['input']>;
  answer?: InputMaybe<Scalars['String']['input']>;
  referendumId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type CreateUser = {
  email: Scalars['String']['input'];
  externalId: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CursorPaging = {
  /** Paginate after opaque cursor */
  after?: InputMaybe<Scalars['ConnectionCursor']['input']>;
  /** Paginate before opaque cursor */
  before?: InputMaybe<Scalars['ConnectionCursor']['input']>;
  /** Paginate first */
  first?: InputMaybe<Scalars['Int']['input']>;
  /** Paginate last */
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type DeleteManyReferendumVotesInput = {
  /** Filter to find records to delete */
  filter: ReferendumVoteDeleteFilter;
};

export type DeleteManyReferendumsInput = {
  /** Filter to find records to delete */
  filter: ReferendumDeleteFilter;
};

export type DeleteManyResponse = {
  __typename?: 'DeleteManyResponse';
  /** The number of records deleted. */
  deletedCount: Scalars['Int']['output'];
};

export type DeleteManyUsersInput = {
  /** Filter to find records to delete */
  filter: UserDeleteFilter;
};

export type DeleteOneReferendumInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneReferendumVoteInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneUserInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type IdFilterComparison = {
  eq?: InputMaybe<Scalars['ID']['input']>;
  gt?: InputMaybe<Scalars['ID']['input']>;
  gte?: InputMaybe<Scalars['ID']['input']>;
  iLike?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<Scalars['ID']['input']>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['ID']['input']>;
  lt?: InputMaybe<Scalars['ID']['input']>;
  lte?: InputMaybe<Scalars['ID']['input']>;
  neq?: InputMaybe<Scalars['ID']['input']>;
  notILike?: InputMaybe<Scalars['ID']['input']>;
  notIn?: InputMaybe<Array<Scalars['ID']['input']>>;
  notLike?: InputMaybe<Scalars['ID']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addVotesToReferendum: Referendum;
  createManyReferendumVotes: Array<ReferendumVote>;
  createManyReferendums: Array<Referendum>;
  createManyUsers: Array<User>;
  createOneReferendum: Referendum;
  createOneReferendumVote: ReferendumVote;
  createOneUser: User;
  deleteManyReferendumVotes: DeleteManyResponse;
  deleteManyReferendums: DeleteManyResponse;
  deleteManyUsers: DeleteManyResponse;
  deleteOneReferendum: ReferendumDeleteResponse;
  deleteOneReferendumVote: ReferendumVoteDeleteResponse;
  deleteOneUser: UserDeleteResponse;
  setVotesOnReferendum: Referendum;
  updateManyReferendumVotes: UpdateManyResponse;
  updateManyReferendums: UpdateManyResponse;
  updateManyUsers: UpdateManyResponse;
  updateOneReferendum: Referendum;
  updateOneReferendumVote: ReferendumVote;
  updateOneUser: User;
};

export type MutationAddVotesToReferendumArgs = {
  input: AddVotesToReferendumInput;
};

export type MutationCreateManyReferendumVotesArgs = {
  input: CreateManyReferendumVotesInput;
};

export type MutationCreateManyReferendumsArgs = {
  input: CreateManyReferendumsInput;
};

export type MutationCreateManyUsersArgs = {
  input: CreateManyUsersInput;
};

export type MutationCreateOneReferendumArgs = {
  input: CreateOneReferendumInput;
};

export type MutationCreateOneReferendumVoteArgs = {
  input: CreateOneReferendumVoteInput;
};

export type MutationCreateOneUserArgs = {
  input: CreateOneUserInput;
};

export type MutationDeleteManyReferendumVotesArgs = {
  input: DeleteManyReferendumVotesInput;
};

export type MutationDeleteManyReferendumsArgs = {
  input: DeleteManyReferendumsInput;
};

export type MutationDeleteManyUsersArgs = {
  input: DeleteManyUsersInput;
};

export type MutationDeleteOneReferendumArgs = {
  input: DeleteOneReferendumInput;
};

export type MutationDeleteOneReferendumVoteArgs = {
  input: DeleteOneReferendumVoteInput;
};

export type MutationDeleteOneUserArgs = {
  input: DeleteOneUserInput;
};

export type MutationSetVotesOnReferendumArgs = {
  input: SetVotesOnReferendumInput;
};

export type MutationUpdateManyReferendumVotesArgs = {
  input: UpdateManyReferendumVotesInput;
};

export type MutationUpdateManyReferendumsArgs = {
  input: UpdateManyReferendumsInput;
};

export type MutationUpdateManyUsersArgs = {
  input: UpdateManyUsersInput;
};

export type MutationUpdateOneReferendumArgs = {
  input: UpdateOneReferendumInput;
};

export type MutationUpdateOneReferendumVoteArgs = {
  input: UpdateOneReferendumVoteInput;
};

export type MutationUpdateOneUserArgs = {
  input: UpdateOneUserInput;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  /** The cursor of the last returned record. */
  endCursor?: Maybe<Scalars['ConnectionCursor']['output']>;
  /** true if paging forward and there are more records. */
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  /** true if paging backwards and there are more records. */
  hasPreviousPage?: Maybe<Scalars['Boolean']['output']>;
  /** The cursor of the first returned record. */
  startCursor?: Maybe<Scalars['ConnectionCursor']['output']>;
};

export type Query = {
  __typename?: 'Query';
  me: User;
  referendum: Referendum;
  referendumVote: ReferendumVote;
  referendumVotes: ReferendumVoteConnection;
  referendums: ReferendumConnection;
  user: User;
  users: UserConnection;
};

export type QueryReferendumArgs = {
  id: Scalars['ID']['input'];
};

export type QueryReferendumVoteArgs = {
  id: Scalars['ID']['input'];
};

export type QueryReferendumVotesArgs = {
  filter?: ReferendumVoteFilter;
  paging?: CursorPaging;
  sorting?: Array<ReferendumVoteSort>;
};

export type QueryReferendumsArgs = {
  filter?: ReferendumFilter;
  paging?: CursorPaging;
  sorting?: Array<ReferendumSort>;
};

export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type QueryUsersArgs = {
  filter?: UserFilter;
  paging?: CursorPaging;
  sorting?: Array<UserSort>;
};

export type Referendum = {
  __typename?: 'Referendum';
  /** referendum answer kind */
  answerKind: ReferendumAnswerKind;
  answers: Array<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  endDate: Scalars['DateTime']['output'];
  finalVote?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  participantsExternalIds: Array<Scalars['String']['output']>;
  /** referendum participants kind */
  participantsKind?: Maybe<ReferendumParticipantsKind>;
  participantsRoles: Array<Scalars['String']['output']>;
  question: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  startDate?: Maybe<Scalars['DateTime']['output']>;
  status: ReferendumStatus;
  updatedAt: Scalars['DateTime']['output'];
  votes: Array<ReferendumVote>;
};

export type ReferendumVotesArgs = {
  filter?: ReferendumVoteFilter;
  sorting?: Array<ReferendumVoteSort>;
};

export enum ReferendumAnswerKind {
  Multiple = 'Multiple',
  YesNo = 'YesNo'
}

export type ReferendumConnection = {
  __typename?: 'ReferendumConnection';
  /** Array of edges. */
  edges: Array<ReferendumEdge>;
  /** Paging information */
  pageInfo: PageInfo;
};

export type ReferendumDeleteFilter = {
  and?: InputMaybe<Array<ReferendumDeleteFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<ReferendumDeleteFilter>>;
  slug?: InputMaybe<StringFieldComparison>;
};

export type ReferendumDeleteResponse = {
  __typename?: 'ReferendumDeleteResponse';
  /** referendum answer kind */
  answerKind?: Maybe<ReferendumAnswerKind>;
  answers?: Maybe<Array<Scalars['String']['output']>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  finalVote?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  participantsExternalIds?: Maybe<Array<Scalars['String']['output']>>;
  /** referendum participants kind */
  participantsKind?: Maybe<ReferendumParticipantsKind>;
  participantsRoles?: Maybe<Array<Scalars['String']['output']>>;
  question?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  startDate?: Maybe<Scalars['DateTime']['output']>;
  status?: Maybe<ReferendumStatus>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ReferendumEdge = {
  __typename?: 'ReferendumEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor']['output'];
  /** The node containing the Referendum */
  node: Referendum;
};

export type ReferendumFilter = {
  and?: InputMaybe<Array<ReferendumFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<ReferendumFilter>>;
  slug?: InputMaybe<StringFieldComparison>;
};

export enum ReferendumParticipantsKind {
  All = 'All',
  ByEmail = 'ByEmail',
  ByRole = 'ByRole'
}

export type ReferendumSort = {
  direction: SortDirection;
  field: ReferendumSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ReferendumSortFields {
  Id = 'id',
  Name = 'name',
  Slug = 'slug'
}

export enum ReferendumStatus {
  Closed = 'Closed',
  InProgress = 'InProgress',
  NoStarted = 'NoStarted'
}

export type ReferendumUpdateFilter = {
  and?: InputMaybe<Array<ReferendumUpdateFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<ReferendumUpdateFilter>>;
  slug?: InputMaybe<StringFieldComparison>;
};

export type ReferendumVote = {
  __typename?: 'ReferendumVote';
  agree: Scalars['Boolean']['output'];
  answer?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type ReferendumVoteConnection = {
  __typename?: 'ReferendumVoteConnection';
  /** Array of edges. */
  edges: Array<ReferendumVoteEdge>;
  /** Paging information */
  pageInfo: PageInfo;
};

export type ReferendumVoteDeleteFilter = {
  and?: InputMaybe<Array<ReferendumVoteDeleteFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ReferendumVoteDeleteFilter>>;
};

export type ReferendumVoteDeleteResponse = {
  __typename?: 'ReferendumVoteDeleteResponse';
  agree?: Maybe<Scalars['Boolean']['output']>;
  answer?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ReferendumVoteEdge = {
  __typename?: 'ReferendumVoteEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor']['output'];
  /** The node containing the ReferendumVote */
  node: ReferendumVote;
};

export type ReferendumVoteFilter = {
  and?: InputMaybe<Array<ReferendumVoteFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ReferendumVoteFilter>>;
};

export type ReferendumVoteSort = {
  direction: SortDirection;
  field: ReferendumVoteSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ReferendumVoteSortFields {
  Id = 'id'
}

export type ReferendumVoteUpdateFilter = {
  and?: InputMaybe<Array<ReferendumVoteUpdateFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<ReferendumVoteUpdateFilter>>;
};

export type SetVotesOnReferendumInput = {
  /** The id of the record. */
  id: Scalars['ID']['input'];
  /** The ids of the relations. */
  relationIds: Array<Scalars['ID']['input']>;
};

/** Sort Directions */
export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

/** Sort Nulls Options */
export enum SortNulls {
  NullsFirst = 'NULLS_FIRST',
  NullsLast = 'NULLS_LAST'
}

export type StringFieldComparison = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  iLike?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  notILike?: InputMaybe<Scalars['String']['input']>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateManyReferendumVotesInput = {
  /** Filter used to find fields to update */
  filter: ReferendumVoteUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateReferendumVote;
};

export type UpdateManyReferendumsInput = {
  /** Filter used to find fields to update */
  filter: ReferendumUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateReferendum;
};

export type UpdateManyResponse = {
  __typename?: 'UpdateManyResponse';
  /** The number of records updated. */
  updatedCount: Scalars['Int']['output'];
};

export type UpdateManyUsersInput = {
  /** Filter used to find fields to update */
  filter: UserUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateUser;
};

export type UpdateOneReferendumInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateReferendum;
};

export type UpdateOneReferendumVoteInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateReferendumVote;
};

export type UpdateOneUserInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateUser;
};

export type UpdateReferendum = {
  /** referendum answer kind */
  answerKind?: InputMaybe<ReferendumAnswerKind>;
  answers?: InputMaybe<Array<Scalars['String']['input']>>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  finalVote?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  participantsExternalIds?: InputMaybe<Array<Scalars['String']['input']>>;
  /** referendum participants kind */
  participantsKind?: InputMaybe<ReferendumParticipantsKind>;
  participantsRoles?: InputMaybe<Array<Scalars['String']['input']>>;
  question?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<ReferendumStatus>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateReferendumVote = {
  agree?: InputMaybe<Scalars['Boolean']['input']>;
  answer?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateUser = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  externalId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  externalId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type UserConnection = {
  __typename?: 'UserConnection';
  /** Array of edges. */
  edges: Array<UserEdge>;
  /** Paging information */
  pageInfo: PageInfo;
};

export type UserDeleteFilter = {
  and?: InputMaybe<Array<UserDeleteFilter>>;
  email?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<UserDeleteFilter>>;
};

export type UserDeleteResponse = {
  __typename?: 'UserDeleteResponse';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  externalId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor']['output'];
  /** The node containing the User */
  node: User;
};

export type UserFilter = {
  and?: InputMaybe<Array<UserFilter>>;
  email?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<UserFilter>>;
};

export type UserSort = {
  direction: SortDirection;
  field: UserSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum UserSortFields {
  Email = 'email',
  Id = 'id',
  Name = 'name'
}

export type UserUpdateFilter = {
  and?: InputMaybe<Array<UserUpdateFilter>>;
  email?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<UserUpdateFilter>>;
};

export type CreateOneReferendumVoteMutationVariables = Exact<{
  createOneReferendumVoteInput2: CreateOneReferendumVoteInput;
}>;

export type CreateOneReferendumVoteMutation = {
  __typename?: 'Mutation';
  createOneReferendumVote: {
    __typename?: 'ReferendumVote';
    id: string;
    agree: boolean;
    answer?: string | null;
  };
};

export type CreateOneReferendumMutationVariables = Exact<{
  input: CreateOneReferendumInput;
}>;

export type CreateOneReferendumMutation = {
  __typename?: 'Mutation';
  createOneReferendum: { __typename?: 'Referendum'; id: string };
};

export type FindReferendumsQueryVariables = Exact<{ [key: string]: never }>;

export type FindReferendumsQuery = {
  __typename?: 'Query';
  referendums: {
    __typename?: 'ReferendumConnection';
    edges: Array<{
      __typename?: 'ReferendumEdge';
      node: {
        __typename?: 'Referendum';
        answers: Array<string>;
        createdAt: Date;
        description?: string | null;
        question: string;
        endDate: Date;
        id: string;
        name: string;
        startDate?: Date | null;
        slug: string;
        status: ReferendumStatus;
      };
    }>;
  };
};

export type GetReferendumByIdQueryVariables = Exact<{
  referendumId: Scalars['ID']['input'];
}>;

export type GetReferendumByIdQuery = {
  __typename?: 'Query';
  referendum: {
    __typename?: 'Referendum';
    answers: Array<string>;
    answerKind: ReferendumAnswerKind;
    createdAt: Date;
    description?: string | null;
    endDate: Date;
    finalVote?: string | null;
    id: string;
    name: string;
    participantsExternalIds: Array<string>;
    participantsKind?: ReferendumParticipantsKind | null;
    participantsRoles: Array<string>;
    question: string;
    slug: string;
    startDate?: Date | null;
    status: ReferendumStatus;
    updatedAt: Date;
    votes: Array<{
      __typename?: 'ReferendumVote';
      user: { __typename?: 'User'; id: string; externalId: string };
    }>;
  };
};

export type GetMeQueryVariables = Exact<{ [key: string]: never }>;

export type GetMeQuery = {
  __typename?: 'Query';
  me: { __typename?: 'User'; id: string; externalId: string; email: string };
};

export const CreateOneReferendumVoteDocument = gql`
  mutation CreateOneReferendumVote($createOneReferendumVoteInput2: CreateOneReferendumVoteInput!) {
    createOneReferendumVote(input: $createOneReferendumVoteInput2) {
      id
      agree
      answer
    }
  }
`;
export const CreateOneReferendumDocument = gql`
  mutation CreateOneReferendum($input: CreateOneReferendumInput!) {
    createOneReferendum(input: $input) {
      id
    }
  }
`;
export const FindReferendumsDocument = gql`
  query FindReferendums {
    referendums {
      edges {
        node {
          answers
          createdAt
          description
          question
          endDate
          id
          name
          startDate
          slug
          status
        }
      }
    }
  }
`;
export const GetReferendumByIdDocument = gql`
  query GetReferendumById($referendumId: ID!) {
    referendum(id: $referendumId) {
      answers
      answerKind
      createdAt
      description
      endDate
      finalVote
      id
      name
      participantsExternalIds
      participantsKind
      participantsRoles
      question
      slug
      startDate
      status
      updatedAt
      votes {
        user {
          id
          externalId
        }
      }
    }
  }
`;
export const GetMeDocument = gql`
  query GetMe {
    me {
      id
      externalId
      email
    }
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    CreateOneReferendumVote(
      variables: CreateOneReferendumVoteMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<CreateOneReferendumVoteMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateOneReferendumVoteMutation>(
            CreateOneReferendumVoteDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'CreateOneReferendumVote',
        'mutation'
      );
    },
    CreateOneReferendum(
      variables: CreateOneReferendumMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<CreateOneReferendumMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateOneReferendumMutation>(CreateOneReferendumDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        'CreateOneReferendum',
        'mutation'
      );
    },
    FindReferendums(
      variables?: FindReferendumsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<FindReferendumsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FindReferendumsQuery>(FindReferendumsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        'FindReferendums',
        'query'
      );
    },
    GetReferendumById(
      variables: GetReferendumByIdQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<GetReferendumByIdQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetReferendumByIdQuery>(GetReferendumByIdDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        'GetReferendumById',
        'query'
      );
    },
    GetMe(
      variables?: GetMeQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<GetMeQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetMeQuery>(GetMeDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        'GetMe',
        'query'
      );
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
