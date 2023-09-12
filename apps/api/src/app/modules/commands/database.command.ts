import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { Command, Console } from 'nestjs-console';
import { DataSource } from 'typeorm';

import { FixturesService } from '@/app/modules/fixtures';
import { spinner } from '@/utils';

@Console({ command: 'db' })
@Injectable()
export class DatabaseCommand {
  logger = new Logger(DatabaseCommand.name);
  constructor(
    private readonly fixturesService: FixturesService,
    @InjectDataSource() readonly connection: DataSource,
  ) {}

  @Command({
    command: 'seeder:run',
    description: 'run seeder',
  })
  async seederRun() {
    this.logger.log('test');
    const spin = spinner('executing db seeder run...').start();

    await this.connection.synchronize(true);

    try {
      await this.fixturesService.load();
      spin.succeed('db seeder run successfully');
    } catch (error) {
      spin.fail(`an error occured during db seeder run: ${error}`);
    }
  }

  @Command({
    command: 'drop',
    description: 'drop database',
  })
  async dbDrop() {
    const spin = spinner('executing db drop...').start();
    try {
      await this.connection.synchronize(true);
    } catch (error) {
      spin.fail(`an error occured during db drop: ${error}`);
    }

    spin.succeed('db dropped successfully');
  }
}
