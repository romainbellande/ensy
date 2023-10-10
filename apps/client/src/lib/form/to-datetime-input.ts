export const toDatetimeInput = (value: string | Date | null | undefined) =>
  value ? new Date(value).toISOString().slice(0, 16) : '';
