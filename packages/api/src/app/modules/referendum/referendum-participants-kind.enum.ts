import { registerEnumType } from '@nestjs/graphql';

export enum ReferendumParticipantsKind {
  All = 'All',
  ByEmail = 'ByEmail',
  ByRole = 'ByRole',
}

registerEnumType(ReferendumParticipantsKind, {
  name: 'ReferendumParticipantsKind',
});
