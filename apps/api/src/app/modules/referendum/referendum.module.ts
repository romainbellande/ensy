import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';

import { ReferendumAssembler } from './referendum.assembler';
import { ReferendumCreateDto } from './referendum.create.dto';
import { Referendum } from './referendum.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Referendum])],
      assemblers: [ReferendumAssembler],
      resolvers: [
        {
          EntityClass: Referendum,
          DTOClass: Referendum,
          CreateDTOClass: ReferendumCreateDto,
        },
      ],
    }),
  ],
})
export class ReferendumModule {}
