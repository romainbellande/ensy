/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DepGraph } from 'dependency-graph';
import { DataSource } from 'typeorm';

import { spinner } from '@/utils';

import { Seed } from './seed';
/** __Seeds_import__ */
import { userSeed } from './seeds';

const baseSeeds: Seed<any, any>[] = [];

const configurationSeeds: Seed<any, any>[] = [...baseSeeds];

const Seeds: Seed<any, any>[] = [
  /** __Seeds__ */
  ...configurationSeeds,
  userSeed,
];

@Injectable()
export class FixturesService {
  logger = new Logger(FixturesService.name);
  depGraph = new DepGraph();

  constructor(@InjectDataSource() private connection: DataSource) {}

  async loadSeeds(mySeeds: Seed<any, any>[]) {
    const spin = spinner(`loading ${mySeeds.length} seeds`).start();
    this.createDepGraph(mySeeds);

    while (this.depGraph.entryNodes().length > 0) {
      await this.executeSeedsWithoutDependencies();

      this.removeCurrentEntryNodes();
    }
    spin.succeed('all seeds loaded');
  }

  load() {
    return this.loadSeeds(Seeds);
  }

  loadBase() {
    return this.loadSeeds(baseSeeds);
  }

  loadConfiguration() {
    return this.loadSeeds(configurationSeeds);
  }

  private createDepGraph(mySeeds: Seed<any, any>[]) {
    mySeeds.forEach((seed) => {
      this.depGraph.addNode(seed.name, seed);
    });

    mySeeds
      .filter((seed) => seed.dependencies.length > 0)
      .forEach((seed) => {
        seed.dependencies.forEach((dependency) => {
          this.depGraph.addDependency(seed.name, dependency);
        });
      });
  }

  private async executeSeedsWithoutDependencies() {
    const seedsWithoutDependencies = this.getSeedsByNames(
      this.getSeedsWithoutDependencies(),
    ).map((Seed) => this.executeSeed(Seed));

    await Promise.all(seedsWithoutDependencies);
  }

  private async executeSeed(seed: Seed<any, any>) {
    const repository = this.connection.getRepository(seed.name);
    await repository.delete({});
    let prepareData: any;

    if (seed.prepare && seed.dependencies.length > 0) {
      prepareData = await seed.prepare(this.connection);
    }

    const spin = spinner(`inserting ${seed.times} ${seed.name}`);

    const data = seed.getData(prepareData);

    await repository.save(data);
    spin.succeed(`${seed.times} ${seed.name} inserted`);
  }

  private getSeedsByNames(names: string[]): Seed<any, any>[] {
    return names.map(
      (SeedName) => this.depGraph.getNodeData(SeedName) as Seed<any, any>,
    );
  }

  private removeCurrentEntryNodes() {
    this.getSeedsWithoutDependencies().forEach((node) => {
      this.depGraph.removeNode(node);
    });
  }

  private getSeedsWithoutDependencies(): string[] {
    return this.depGraph
      .overallOrder()
      .filter((node) => this.depGraph.dependenciesOf(node).length === 0);
  }
}
