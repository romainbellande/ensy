import { registerEnumType } from '@nestjs/graphql';

export enum ReferendumAnswerKind {
  YesNo = 'YesNo',
  Multiple = 'Multiple',
}

registerEnumType(ReferendumAnswerKind, {
  name: 'ReferendumAnswerKind',
});
