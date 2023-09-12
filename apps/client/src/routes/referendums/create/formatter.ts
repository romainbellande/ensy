import { fromArrayValue } from 'browser-toolkit';

import type { CreateOneReferendumInput } from '@/lib/graphql/gql';

import type { FormValues } from './schema';

export const formatter = ({
  answers,
  endDate,
  startDate,
  participantsExternalIds,
  participantsRoles,
  ...rest
}: FormValues): CreateOneReferendumInput => ({
  referendum: {
    ...rest,
    answers: fromArrayValue(answers),
    participantsExternalIds: fromArrayValue(participantsExternalIds),
    participantsRoles: fromArrayValue(participantsRoles),
    endDate: new Date(endDate),
    startDate: startDate ? new Date(startDate) : new Date()
  }
});
