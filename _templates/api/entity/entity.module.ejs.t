---
to: packages/api/src/app/modules/<%=name%>/<%=name%>.module.ts
---
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { <%= h.changeCase.title(name) %>CreateDto } from './<%=name%>.create.dto';
import { <%= h.changeCase.title(name) %>Entity } from './<%=name%>.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([<%= h.changeCase.title(name) %>Entity])],
      resolvers: [
        {
          EntityClass: <%= h.changeCase.title(name) %>Entity,
          DTOClass: <%= h.changeCase.title(name) %>Entity,
          CreateDTOClass: <%= h.changeCase.title(name) %>CreateDto,
        },
      ],
    }),
  ],
})
export class <%= h.changeCase.title(name) %>Module {}
