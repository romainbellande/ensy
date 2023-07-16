import { BaseEntity } from '@api/utils';
import { Column, Entity } from 'typeorm';
import { ReferendumParticipants } from './referendum-participants.enum';
import { Field, ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@ptc-org/nestjs-query-graphql';
import { ReferendumCreateDto } from './referendum.create.dto';
import { ReferendumStatus } from './referendum-status.enum';

@Entity('Referendum')
@ObjectType('Referendum')
export class ReferendumEntity
  extends BaseEntity
  implements ReferendumCreateDto
{
  @Column()
  @FilterableField()
  name: string;

  @Column({ unique: true })
  @FilterableField()
  slug: string;

  @Column()
  @Field()
  description: string;

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
    enum: ReferendumParticipants,
    default: ReferendumParticipants.All,
  })
  @Field(() => ReferendumParticipants, {
    description: 'referendum participants',
  })
  participants: ReferendumParticipants = ReferendumParticipants.All;

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
}
