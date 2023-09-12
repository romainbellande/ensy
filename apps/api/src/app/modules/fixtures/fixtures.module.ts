import { Module } from '@nestjs/common';
import { FixturesService } from './fixtures.service';

@Module({
  controllers: [],
  providers: [FixturesService],
  exports: [FixturesService],
})
export class FixturesModule {}
