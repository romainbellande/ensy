---
to: src/app/modules/<%=name%>/<%=name%>.create.dto.ts
---
import { InputType } from '@nestjs/graphql';

@InputType('Create<%= h.changeCase.pascal(name) %>')
export class <%= h.changeCase.pascal(name) %>CreateDto {

}
