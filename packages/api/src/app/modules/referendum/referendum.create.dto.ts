import { InputType, Field } from '@nestjs/graphql';
import { ReferendumParticipants } from './referendum-participants.enum';
import { IsNotEmpty, IsEnum, IsISO8601, IsOptional, IsString } from 'class-validator';

@InputType('CreateReferendum')
export class ReferendumCreateDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  slug: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  description: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  question: string;

  @Field(() => [String], {
    defaultValue: [],
  })
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @IsOptional()
  answers: string[] = [];

  @Field(() => ReferendumParticipants, {
    description: 'referendum participants',
  })
  @IsEnum(ReferendumParticipants)
  participants: ReferendumParticipants;

  @Field(() => [String], {
    defaultValue: [],
  })
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @IsOptional()
  participantsExternalIds: string[] = [];

  @Field(() => [String], { defaultValue: [] })
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @IsOptional()
  participantsRoles: string[] = [];

  @Field({
    description: 'starting date',
    defaultValue: new Date()
  })
  @IsISO8601()
  @IsOptional()
  startDate?: Date;

  @Field()
  @IsISO8601()
  endDate: Date;
}
