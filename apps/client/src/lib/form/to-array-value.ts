export const toArrayValue = <T = string>(arr: T[] | undefined) =>
  (arr || []).map((value) => ({ value }));
