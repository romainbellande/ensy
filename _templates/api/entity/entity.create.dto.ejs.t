---
to: packages/api/src/app/modules/<%=name%>/<%=name%>.create.dto.ts
---
import { InputType } from '@nestjs/graphql';
import { <%= h.changeCase.capitalCase(name) %>Dto } from './<%=name%>.dto';

@InputType('Create<%= h.changeCase.capitalCase(name) %>')
export class <%= h.changeCase.capitalCase(name) %>CreateDto implements Omit<<%= h.changeCase.capitalCase(name) %>Dto, 'id' | 'createdAt' | 'updatedAt'> {

}
