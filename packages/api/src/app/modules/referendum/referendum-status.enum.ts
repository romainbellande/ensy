import { registerEnumType } from '@nestjs/graphql';

export enum ReferendumStatus {
  NoStarted = 'NotStarted',
  InProgress = 'InProgress',
  Closed = 'Closed',
}

registerEnumType(ReferendumStatus, { name: 'ReferendumStatus' });
