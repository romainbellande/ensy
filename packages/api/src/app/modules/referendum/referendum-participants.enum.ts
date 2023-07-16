import { registerEnumType } from '@nestjs/graphql';

export enum ReferendumParticipants {
  All = 'All',
  ByName = 'ByName',
  ByRole = 'ByRole',
}

registerEnumType(ReferendumParticipants, { name: 'ReferendumParticipants' });
