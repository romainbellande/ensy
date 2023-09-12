import { InputType, Field } from '@nestjs/graphql';

@InputType('CreateReferendumVote')
export class ReferendumVoteCreateDto {
  @Field()
  userId: string;

  @Field()
  referendumId: string;

  @Field({ nullable: true })
  answer?: string;

  @Field(() => Boolean, { nullable: true })
  agree?: boolean;
}
