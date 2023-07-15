---
to: packages/api/src/app/modules/<%=name%>/<%=name%>.create.dto.ts
---
import { InputType } from '@nestjs/graphql';

@InputType('Create<%= h.changeCase.title(name) %>')
export class <%= h.changeCase.title(name) %>CreateDto {

}
