import * as yup from 'yup';
import { ReferendumAnswerKind, ReferendumParticipantsKind } from '@/lib/graphql/gql';

export const schema = yup.object({
  name: yup.string().min(2).max(50).required(),
  startDate: yup.string(),
  endDate: yup.string().required(),
  question: yup.string().min(2).max(50).required(),
  description: yup.string().optional().min(0).max(500),
  answerKind: yup.string().oneOf(Object.values(ReferendumAnswerKind)).required(),
  participantsKind: yup.string().oneOf(Object.values(ReferendumParticipantsKind)).required(),
  answers: yup
    .array()
    .of(yup.object({ value: yup.string().required() }))
    .required(),
  participantsRoles: yup
    .array()
    .of(yup.object({ value: yup.string().required() }))
    .required(),
  selectedRole: yup.string().ensure(),
  participantsExternalIds: yup
    .array()
    .of(yup.object({ value: yup.string().email().required() }))
    .required(),
  slug: yup.string().min(2).max(50).required()
});

export type FormValues = yup.InferType<typeof schema>;
