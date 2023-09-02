import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { ReferendumCreateDto } from './referendum.create.dto';
import { ReferendumEntity } from './referendum.entity';
import { ReferendumAssembler } from './referendum.assembler';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([ReferendumEntity])],
      assemblers: [ReferendumAssembler],
      resolvers: [
        {
          EntityClass: ReferendumEntity,
          DTOClass: ReferendumEntity,
          CreateDTOClass: ReferendumCreateDto,
        },
      ],
    }),
  ],
})
export class ReferendumModule {}
