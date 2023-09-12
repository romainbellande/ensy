import { Entity, Column, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '@/utils';
import { User } from '../user/user.entity';
import { Referendum } from '../referendum';
import { ReferendumVoteCreateDto } from './referendum-vote.create.dto';
import { Relation } from '@ptc-org/nestjs-query-graphql';

@Entity('ReferendumVote')
@ObjectType('ReferendumVote')
@Relation('user', () => User)
@Unique(['userId', 'referendumId'])
export class ReferendumVote
  extends BaseEntity<ReferendumVote>
  implements ReferendumVoteCreateDto
{
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => Referendum, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'referendumId' })
  referendum: Referendum;

  @Column()
  referendumId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  answer?: string;

  @Column({ type: 'bool', default: false })
  @Field(() => Boolean)
  agree?: boolean;
}
