export abstract class Formatter<FormValues, CreateOneInput, V extends keyof CreateOneInput> {
  formValues: FormValues;
  id?: string;
  referendumKey: V;

  constructor({ values, id, referendumKey }: { values: FormValues, id?: string, referendumKey: V }) {
    this.formValues = values;
    this.id = id;
    this.referendumKey = referendumKey;
  }

  abstract formatValues(): CreateOneInput[V];

  public toCreateOneInput(): { input: { [key in V]: CreateOneInput[V] } } {
    const values = this.formatValues();

    const input = {
      [this.referendumKey as string]: values
    } as { [key in V]: CreateOneInput[V] };

    return this.inputWrapper<{ [key in V]: CreateOneInput[V] }>(input);
  }

  public toUpdateOneInput(): { input: { id: string, update: CreateOneInput[V] } } {
    const values = this.formatValues();

    return this.inputWrapper<{ id: string, update: CreateOneInput[V] }>({
      id: this.id!,
      update: values
    })
  }

  private inputWrapper<W>(input: W) {
    return {
      input
    }
  }
}
