import { Module } from '@nestjs/common';
import { ConsoleModule } from 'nestjs-console';

import { FixturesModule } from '@/app/modules/fixtures';

import { DatabaseCommand } from './database.command';

@Module({
  imports: [ConsoleModule, FixturesModule],
  controllers: [],
  providers: [DatabaseCommand],
  exports: [DatabaseCommand],
})
export class CommandsModule {}
