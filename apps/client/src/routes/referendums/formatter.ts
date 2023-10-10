import { fromArrayValue } from 'browser-toolkit';

import type { CreateOneReferendumInput, UpdateOneReferendumInput } from '@/lib/graphql/gql';

import type { FormValues } from './schema';

interface FormatterInput {
  values: FormValues;
  id?: string;
}

export class Formatter {
  formValues: FormValues;
  id?: string;

  constructor({ values, id }: FormatterInput) {
    this.formValues = values;
    this.id = id;
  }

  private formatValues() {
    const {
      answers,
      endDate,
      startDate,
      participantsExternalIds,
      participantsRoles,
      ...rest
    } = this.formValues;

    return {
      ...rest,
      answers: fromArrayValue(answers),
      participantsExternalIds: fromArrayValue(participantsExternalIds),
      participantsRoles: fromArrayValue(participantsRoles),
      endDate: new Date(endDate),
      startDate: startDate ? new Date(startDate) : new Date()
    };
  }


  public toCreateOneInput() {
    const values = this.formatValues();

    return this.inputWrapper<CreateOneReferendumInput>({
      referendum: values
    });
  }

  public toUpdateOneInput()  {
    const values = this.formatValues();

    return this.inputWrapper<UpdateOneReferendumInput>({
      id: this.id!,
      update: values,
    })
  }

  private inputWrapper<T>(input: T) {
    return {
      input
    }
  }
}
