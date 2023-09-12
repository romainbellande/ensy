import { Field, ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@ptc-org/nestjs-query-graphql';
import { Column, Entity } from 'typeorm';

import { BaseEntity } from '@/utils';

import type { UserCreateDto } from './user.create.dto';

@Entity('User')
@ObjectType('User')
export class User extends BaseEntity<User> implements UserCreateDto {
  @Column()
  @FilterableField()
  name: string;

  @Column({ unique: true })
  @FilterableField()
  email: string;

  @Column({ unique: true })
  @Field()
  externalId: string;
}
