import { Field, InputType } from '@nestjs/graphql';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { ReferendumAnswerKind } from './referendum-answer-kind.enum';
import { ReferendumParticipantsKind } from './referendum-participants-kind.enum';

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

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

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

  @Field(() => ReferendumAnswerKind, {
    description: 'referendum answer kind',
  })
  @IsEnum(ReferendumAnswerKind)
  answerKind: ReferendumAnswerKind;

  @Field(() => ReferendumParticipantsKind, {
    description: 'referendum participants',
  })
  @IsEnum(ReferendumParticipantsKind)
  participantsKind: ReferendumParticipantsKind;

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
    defaultValue: new Date(),
  })
  @IsDate()
  @IsOptional()
  startDate?: Date;

  @Field()
  @IsDate()
  endDate: Date;
}
