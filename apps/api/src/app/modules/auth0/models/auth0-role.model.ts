import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Auth0Role {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;
}
