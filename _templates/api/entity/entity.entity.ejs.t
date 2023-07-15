---
to: packages/api/src/app/modules/<%=name%>/<%=name%>.entity.ts
---
import { BaseEntity } from '@api/utils';
import {
  Entity,
} from 'typeorm';
import { Create<%= h.changeCase.title(name) %> } from './<%=name%>.create.dto';

@Entity('<%= h.changeCase.title(name) %>')
export class <%= h.changeCase.title(name) %>Entity extends BaseEntity implements Create<%= h.changeCase.title(name) %> {

}
