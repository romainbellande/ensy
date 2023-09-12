---
to: src/app/modules/<%=name%>/<%=name%>.entity.ts
---
import {
  Entity,
} from 'typeorm';
import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '@/utils';
import { <%= h.changeCase.pascal(name) %>CreateDto } from './<%=name%>.create.dto';

@Entity('<%= h.changeCase.pascal(name) %>')
@ObjectType('<%= h.changeCase.pascal(name) %>')
export class <%= h.changeCase.pascal(name) %> extends BaseEntity implements <%= h.changeCase.pascal(name) %>CreateDto {

}
