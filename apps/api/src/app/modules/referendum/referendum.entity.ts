import { Field, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { AfterLoad, Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '@/utils';

import { ReferendumVote } from '../referendum-vote';
import type { ReferendumCreateDto } from './referendum.create.dto';
import { ReferendumAnswerKind } from './referendum-answer-kind.enum';
import { ReferendumParticipantsKind } from './referendum-participants-kind.enum';
import { ReferendumStatus } from './referendum-status.enum';

@Entity('Referendum')
@ObjectType('Referendum')
@UnPagedRelation('votes', () => ReferendumVote, { update: { enabled: true } })
export class Referendum
  extends BaseEntity<Referendum>
  implements ReferendumCreateDto
{
  @Column()
  @FilterableField()
  name: string;

  @Column({ unique: true })
  @FilterableField()
  slug: string;

  @Column()
  @Field({ nullable: true })
  description?: string;

  @Column()
  @Field()
  question: string;

  @Column({ type: 'simple-array', default: '' })
  @Field(() => [String], {
    defaultValue: [],
  })
  answers: string[];

  @Column({
    type: 'enum',
    enum: ReferendumAnswerKind,
  })
  @Field(() => ReferendumAnswerKind, {
    description: 'referendum answer kind',
  })
  answerKind: ReferendumAnswerKind;

  @Column({
    type: 'enum',
    enum: ReferendumParticipantsKind,
    default: ReferendumParticipantsKind.All,
  })
  @Field(() => ReferendumParticipantsKind, {
    description: 'referendum participants kind',
    nullable: true,
  })
  participantsKind: ReferendumParticipantsKind = ReferendumParticipantsKind.All;

  @Column({ type: 'simple-array', default: '' })
  @Field(() => [String], {
    defaultValue: [],
  })
  participantsExternalIds: string[];

  @Column({ type: 'simple-array', default: '' })
  @Field(() => [String], {
    defaultValue: [],
  })
  participantsRoles: string[];

  @Column({ type: 'timestamp', default: 'NOW()' })
  @Field({ nullable: true })
  startDate?: Date;

  @Column({ type: 'timestamp' })
  @Field()
  endDate!: Date;

  @Field(() => String, { nullable: true })
  finalVote?: string;

  @Field(() => ReferendumStatus)
  status: ReferendumStatus;

  @OneToMany(() => ReferendumVote, (vote) => vote.referendum)
  votes: ReferendumVote[];

  @AfterLoad()
  afterLoad() {
    this.status = this.getStatus();
  }

  private getStatus(): ReferendumStatus {
    const currentDate = new Date();

    if (!this.startDate || currentDate < this.startDate) {
      return ReferendumStatus.NoStarted;
    } else if (currentDate < this.endDate) {
      return ReferendumStatus.InProgress;
    }

    return ReferendumStatus.Closed;
  }
}
