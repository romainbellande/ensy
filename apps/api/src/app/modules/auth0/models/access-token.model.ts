import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AccessToken {
  @Field()
  access_token: string;

  @Field()
  token_type: 'Bearer';
}
