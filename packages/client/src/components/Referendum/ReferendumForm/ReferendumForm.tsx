import { FC } from 'react';
import { Button } from '@client/components/ui/button';
import { Form } from '@client/components/ui/form';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardFooter } from '@client/components/ui/card';
import { Field } from '@client/components/Field';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  ReferendumAnswerKind,
  ReferendumParticipantsKind,
} from '@client/gql/generated';
import {
  RadioGroupField,
  RadioGroupItemProps,
} from '@client/components/RadioGroupField';

const formSchema = yup.object({
  name: yup.string().min(2).max(50),
  startDate: yup.string().required(),
  endDate: yup.string(),
  question: yup.string().min(2).max(50),
  description: yup.string().min(2).max(500).optional(),
  answerKind: yup.string().oneOf(Object.values(ReferendumAnswerKind)),
  participantsKind: yup
    .string()
    .oneOf(Object.values(ReferendumParticipantsKind)),
  answers: yup.array().of(yup.string().ensure().required()),
  roles: yup.array().of(yup.string().ensure().required()).optional(),
  participants: yup.array().of(yup.string().ensure().required()).optional(),
});

const answerKindItems: RadioGroupItemProps[] = Object.values(
  ReferendumAnswerKind
).map((item) => ({ text: item, value: item }));

export type ReferendumFormValues = yup.InferType<typeof formSchema>;

interface Props {
  onSubmit: (values: ReferendumFormValues) => void;
}

const getTodayDateTime = (): string => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  now.setMilliseconds(0);
  now.setSeconds(0);
  return now.toISOString().slice(0, -1);
};

export const ReferendumForm: FC<Props> = ({ onSubmit }) => {
  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      name: '',
      startDate: getTodayDateTime(),
      question: '',
      description: '',
      answerKind: ReferendumAnswerKind.YesNo,
      participantsKind: ReferendumParticipantsKind.All,
      answers: [],
      roles: [],
      participants: [],
    },
  });

  return (
    <Card className="items-end inline-block">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-8 mt-14"
        >
          <CardContent className="flex flex-col space-y-4">
            <div className="flex space-x-4">
              <Field control={form.control} name="name" />
              <Field control={form.control} name="question" />
            </div>
            <div className="flex space-x-4">
              <Field
                control={form.control}
                name="startDate"
                type="datetime-local"
              />
              <Field
                control={form.control}
                name="endDate"
                type="datetime-local"
              />
            </div>
            <Field control={form.control} name="description" type="textarea" />
            <div>
              <div>
                <RadioGroupField
                  control={form.control}
                  items={answerKindItems}
                  name="answerKind"
                  label="answer(s)"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex justify-end w-full">
              <Button type="submit">Submit</Button>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
