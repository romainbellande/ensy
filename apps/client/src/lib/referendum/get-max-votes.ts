import { ReferendumParticipantsKind } from '../graphql/gql';
import type { Referendum } from './types';

export const getMaxVotes = (referendum: Referendum, nbUsers: number): number => {
  const mapper = {
    [ReferendumParticipantsKind.All]: nbUsers,
    [ReferendumParticipantsKind.ByEmail]: referendum.participantsExternalIds.length,
    [ReferendumParticipantsKind.ByRole]: referendum.participantsRoles.length
  };

  return mapper[referendum.participantsKind || ReferendumParticipantsKind.All];
};
