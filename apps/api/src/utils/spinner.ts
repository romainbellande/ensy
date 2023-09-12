import * as ora from 'ora';
import { default as Spinner } from 'ora';

export const spinner = ora as unknown as typeof Spinner;
