import * as yup from 'yup';

export const schema = yup.object({
  answer: yup.string().optional(),
  agree: yup.boolean().transform((value) => Boolean(value))
});

export type FormValues = yup.InferType<typeof schema>;
