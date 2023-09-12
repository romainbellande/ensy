---
to: src/app/modules/<%=name%>/<%=name%>.module.ts
---
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { <%= h.changeCase.pascal(name) %>CreateDto } from './<%=name%>.create.dto';
import { <%= h.changeCase.pascal(name) %>Entity } from './<%=name%>.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([<%= h.changeCase.pascal(name) %>Entity])],
      resolvers: [
        {
          EntityClass: <%= h.changeCase.pascal(name) %>Entity,
          DTOClass: <%= h.changeCase.pascal(name) %>Entity,
          CreateDTOClass: <%= h.changeCase.pascal(name) %>CreateDto,
        },
      ],
    }),
  ],
})
export class <%= h.changeCase.pascal(name) %>Module {}
