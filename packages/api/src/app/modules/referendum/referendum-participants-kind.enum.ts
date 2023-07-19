import { registerEnumType } from '@nestjs/graphql';

export enum ReferendumParticipantsKind {
  All = 'All',
  ByName = 'ByName',
  ByRole = 'ByRole',
}

registerEnumType(ReferendumParticipantsKind, {
  name: 'ReferendumParticipantsKind',
});
