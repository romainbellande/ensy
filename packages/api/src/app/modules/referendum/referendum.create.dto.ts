import { InputType, Field } from '@nestjs/graphql';
import { ReferendumParticipantsKind } from './referendum-participants-kind.enum';
import {
  IsNotEmpty,
  IsEnum,
  IsISO8601,
  IsOptional,
  IsString,
} from 'class-validator';
import { ReferendumAnswerKind } from './referendum-answer-kind.enum';

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

  @Field(() => ReferendumAnswerKind, {
    description: 'referendum answer kind',
  })
  @IsEnum(ReferendumParticipantsKind)
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
  @IsISO8601()
  @IsOptional()
  startDate?: Date;

  @Field()
  @IsISO8601()
  endDate: Date;
}
