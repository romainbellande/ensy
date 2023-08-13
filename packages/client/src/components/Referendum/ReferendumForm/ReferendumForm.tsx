import { FC, useEffect } from 'react';
import { Button } from '@client/components/ui/button';
import { Form } from '@client/components/ui/form';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
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
import { referendumTransformer } from './referendum.transformer';
import slugify from 'slugify';
import { useCreateOneReferendumMutation } from '@client/gql/generated';
import { formSchema } from './form-schema';

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

const getTodayDateTime = (): string => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  now.setMilliseconds(0);
  now.setSeconds(0);
  return now.toISOString().slice(0, -1);
};

export const ReferendumForm: FC = () => {
  const { mutateAsync } = useCreateOneReferendumMutation();

  const onSubmit = async (values: ReferendumFormValues) => {
    try {
      const referendum = referendumTransformer(values);
      await mutateAsync({ input: { referendum } });
    } catch (error) {
      console.error(`[create referendum] ${JSON.stringify(error)}`);
    }
  };

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      name: '',
      startDate: getTodayDateTime(),
      endDate: getTodayDateTime(),
      question: '',
      description: '',
      answerKind: ReferendumAnswerKind.YesNo,
      participantsKind: ReferendumParticipantsKind.All,
      answers: [],
      participantsRoles: [],
      selectedRole: 'member',
      participantsExternalIds: [],
      slug: '',
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
    name: 'participantsRoles',
  });

  const name = useWatch({ name: 'name', control: form.control });

  useEffect(() => {
    form.setValue('slug', slugify(name));
  }, [name, form]);

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
      form.setValue('participantsExternalIds', []);
    }

    if (participantsKind !== ReferendumParticipantsKind.ByRole) {
      form.setValue('participantsRoles', [{ value: 'admin' }]);
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
                name="slug"
                label="components.ReferendumForm.slug"
              />
            </div>
            <Field
              control={form.control}
              name="question"
              label="components.ReferendumForm.question"
            />
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
                        name={`participantsRoles.${index}.value`}
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
