interface ItemValue {
  value: string;
}

export const fromArrayValue = (arrayValue: ItemValue[]): string[] =>
  arrayValue.map(({ value }) => value);
