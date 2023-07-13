---
to: packages/api/src/app/modules/<%=name%>/<%=name%>.dto.ts
---
import { ObjectType } from '@nestjs/graphql';
import { BaseDto } from '@api/utils/base.dto';

@ObjectType('<%= h.changeCase.capitalCase(name) %>')
export class <%= h.changeCase.capitalCase(name) %>Dto extends BaseDto {

}
