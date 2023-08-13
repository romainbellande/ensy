import { CreateReferendum } from '@client/gql/generated';
import { ReferendumFormValues } from './ReferendumForm';

export const referendumTransformer = (
  values: ReferendumFormValues
): CreateReferendum => {
  const {
    answers,
    participantsRoles,
    selectedRole,
    startDate,
    endDate,
    ...rest
  } = values;

  return {
    ...rest,
    answers: answers.map(({ value }) => value),
    participantsRoles: participantsRoles.map(({ value }) => value),
    startDate: startDate ? new Date(startDate) : new Date(),
    endDate: new Date(endDate),
  };
};
