import { times } from 'lodash';
import { DataSource } from 'typeorm';

interface SeedProps<T, R> {
  name: string;
  itemFn: (index?: number, metadata?: R) => T;
  times?: number;
  dependencies?: string[];
  prepare?: (connection: DataSource) => Promise<R>;
}

export class Seed<T, R = void> {
  name: string;
  itemFn: (index?: number, metadata?: R) => T;
  times: number = 1;
  dependencies: string[] = [];
  prepare?: (connection: DataSource) => Promise<R>;

  constructor({ itemFn, name, times, dependencies, prepare }: SeedProps<T, R>) {
    this.itemFn = itemFn;
    this.name = name;
    this.times = times || 1;
    this.dependencies = dependencies || [];
    this.prepare = prepare;
  }

  getData(prepareData?: R): T[] {
    return times(this.times, (index?: number) =>
      this.itemFn(index, prepareData),
    );
  }
}
