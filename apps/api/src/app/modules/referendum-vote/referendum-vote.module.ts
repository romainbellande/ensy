import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { ReferendumVoteCreateDto } from './referendum-vote.create.dto';
import { ReferendumVote } from './referendum-vote.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([ReferendumVote])],
      resolvers: [
        {
          EntityClass: ReferendumVote,
          DTOClass: ReferendumVote,
          CreateDTOClass: ReferendumVoteCreateDto,
        },
      ],
    }),
  ],
})
export class ReferendumVoteModule {}
