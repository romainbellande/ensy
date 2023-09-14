import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Auth0User {
  @Field()
  created_at: string;

  @Field()
  email: string;

  @Field()
  email_verified: boolean;

  @Field(() => [Identity])
  identities: Identity[];

  @Field()
  name: string;

  @Field()
  nickname: string;

  @Field()
  picture: string;

  @Field()
  updated_at: string;

  @Field()
  user_id: string;

  @Field()
  last_login: string;

  @Field()
  last_ip: string;

  @Field()
  logins_count: number;
}

@ObjectType()
class Identity {
  @Field()
  user_id: string;

  @Field()
  provider: string;

  @Field()
  connection: string;

  @Field()
  isSocial: boolean;
}
