import { FC, useEffect } from 'react';
import { Button } from '@client/components/ui/button';
import { Form } from '@client/components/ui/form';
import { useFieldArray, useForm } from 'react-hook-form';
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
import { Plus, XCircle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Input } from '@client/components/ui';
import {
  SelectField,
  SelectFieldItemProps,
} from '@client/components/SelectField';

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
  answers: yup
    .array()
    .of(yup.object({ value: yup.string().required() }))
    .required(),
  roles: yup
    .array()
    .of(yup.object({ value: yup.string().required() }))
    .required(),
  selectedRole: yup.string().ensure(),
  participants: yup.array().of(yup.string().required()).optional(),
});

const answerKindItems: RadioGroupItemProps[] = Object.values(
  ReferendumAnswerKind
)
  .map((item) => ({
    text: `components.ReferendumForm.answerKind.${item}`,
    value: item,
  }))
  .reverse();

const participantsKindItems: RadioGroupItemProps[] = Object.values(
  ReferendumParticipantsKind
).map((item) => ({
  text: `components.ReferendumForm.participantsKind.${item}`,
  value: item,
}));

const rolesItems: SelectFieldItemProps[] = [
  {
    text: 'shared.roles.member',
    value: 'member',
  },
  {
    text: 'shared.roles.admin',
    value: 'admin',
  },
  {
    text: 'shared.roles.super_admin',
    value: 'super_admin',
  },
];

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
      selectedRole: 'member',
      participants: [],
    },
  });

  const anwsersField = useFieldArray({
    control: form.control,
    name: 'answers',
    rules: {
      required: true,
    },
  });

  const rolesField = useFieldArray({
    control: form.control,
    name: 'roles',
  });

  const answerKind = form.watch('answerKind');

  useEffect(() => {
    if (answerKind === ReferendumAnswerKind.YesNo) {
      form.setValue('answers', []);
    } else {
      form.setValue('answers', [{ value: '' }]);
    }
  }, [form, answerKind]);

  const participantsKind = form.watch('participantsKind');

  useEffect(() => {
    if (participantsKind !== ReferendumParticipantsKind.ByEmail) {
      form.setValue('participants', []);
    }

    if (participantsKind !== ReferendumParticipantsKind.ByRole) {
      form.setValue('roles', [{ value: 'admin' }]);
    }
  }, [form, participantsKind]);

  return (
    <Card className="items-end inline-block">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-8 mt-14"
        >
          <CardContent className="flex flex-col space-y-4">
            <div className="flex space-x-4">
              <Field
                control={form.control}
                name="name"
                label="components.ReferendumForm.name"
              />
              <Field
                control={form.control}
                name="question"
                label="components.ReferendumForm.question"
              />
            </div>
            <div className="flex space-x-4">
              <Field
                control={form.control}
                name="startDate"
                type="datetime-local"
                label="components.ReferendumForm.startDate"
              />
              <Field
                control={form.control}
                name="endDate"
                type="datetime-local"
                label="components.ReferendumForm.endDate"
              />
            </div>
            <Field
              control={form.control}
              name="description"
              type="textarea"
              label="components.ReferendumForm.description"
            />
            <div className="flex justify-between">
              <div className="space-y-4">
                <RadioGroupField
                  control={form.control}
                  items={answerKindItems}
                  name="answerKind"
                  label="components.ReferendumForm.answerKind.label"
                />
                {answerKind === ReferendumAnswerKind.Multiple && (
                  <div className="space-y-4">
                    {form.getValues().answers.length > 0 &&
                      form.getValues().answers.map(({ value }, index) => (
                        <div
                          className="flex items-center space-x-4"
                          key={uuidv4()}
                        >
                          <Field
                            control={form.control}
                            name={`answers.${index}.value`}
                          />
                          <XCircle
                            className="cursor-pointer text-red-500"
                            onClick={() => anwsersField.remove(index)}
                          />
                        </div>
                      ))}
                    <Button
                      type="button"
                      className="space-x-2"
                      icon={<Plus size={16} />}
                      onClick={() => anwsersField.append({ value: '' })}
                    >
                      components.ReferendumForm.answerKind.addAQuestion
                    </Button>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <RadioGroupField
                  control={form.control}
                  items={participantsKindItems}
                  name="participantsKind"
                  label="components.ReferendumForm.participantsKind.label"
                />
                {participantsKind === ReferendumParticipantsKind.ByEmail && (
                  <Input type="search" placeholder="search user by email" />
                )}
                {participantsKind === ReferendumParticipantsKind.ByRole &&
                  rolesField.fields.map((_, index) => (
                    <div key={uuidv4()} className="flex items-center space-x-4">
                      <SelectField
                        name={`roles.${index}.value`}
                        control={form.control}
                        items={rolesItems}
                      />
                      {index + 1 === rolesField.fields.length ? (
                        <Plus
                          className="cursor-pointer"
                          size={16}
                          onClick={() =>
                            rolesField.append({ value: 'super_admin' })
                          }
                        />
                      ) : (
                        <XCircle
                          className="cursor-pointer text-red-500"
                          onClick={() => rolesField.remove(index)}
                        />
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex justify-end w-full">
              <Button type="submit">shared.submit</Button>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
