import { FilterableField } from '@ptc-org/nestjs-query-graphql';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseDto } from '@api/utils/base.dto';

@ObjectType('User')
export class UserDto extends BaseDto {
  @FilterableField()
  name!: string;

  @FilterableField()
  email!: string;

  @Field()
  externalId!: string;
}
