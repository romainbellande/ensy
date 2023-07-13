---
to: packages/api/src/app/modules/<%=name%>/<%=name%>.module.ts
---
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { <%= h.changeCase.capitalCase(name) %>CreateDto } from './<%=name%>.create.dto';
import { <%= h.changeCase.capitalCase(name) %>Dto } from './<%=name%>.dto';
import { <%= h.changeCase.capitalCase(name) %>Entity } from './<%=name%>.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([<%= h.changeCase.capitalCase(name) %>Entity])],
      resolvers: [
        {
          EntityClass: <%= h.changeCase.capitalCase(name) %>Entity,
          DTOClass: <%= h.changeCase.capitalCase(name) %>Dto,
          CreateDTOClass: <%= h.changeCase.capitalCase(name) %>CreateDto,
        },
      ],
    }),
  ],
})
export class <%= h.changeCase.capitalCase(name) %>Module {}
