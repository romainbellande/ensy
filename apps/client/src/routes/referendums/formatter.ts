import { fromArrayValue } from 'browser-toolkit';

import { Formatter } from '@/lib/form/formatter';
import type { CreateOneReferendumInput } from '@/lib/graphql/gql';

import type { FormValues } from './schema';

interface FormatterInput {
  values: FormValues;
  id?: string;
}

export class ReferendumFormatter extends Formatter<FormValues, CreateOneReferendumInput, 'referendum'> {
  constructor(formatterInput: FormatterInput) {
    super({ ...formatterInput, referendumKey: 'referendum' })
  }

  public formatValues() {
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
}

