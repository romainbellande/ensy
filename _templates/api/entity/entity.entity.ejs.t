---
to: packages/api/src/app/modules/<%=name%>/<%=name%>.entity.ts
---
import { BaseEntity } from '@api/utils';
import {
  Entity,
} from 'typeorm';
import { <%= h.changeCase.capitalCase(name) %>Dto } from './<%=name%>.dto';

@Entity()
export class <%= h.changeCase.capitalCase(name) %>Entity extends BaseEntity implements <%= h.changeCase.capitalCase(name) %>Dto {

}
