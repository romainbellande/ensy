import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { BaseDto } from './base.dto';
import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { IDField } from '@ptc-org/nestjs-query-graphql';
import { assignIn } from 'lodash';

@ObjectType({ isAbstract: true })
export abstract class BaseEntity<T> implements BaseDto {
  @PrimaryGeneratedColumn()
  @IDField(() => ID)
  id!: string;

  @CreateDateColumn()
  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @UpdateDateColumn()
  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;

  constructor(payload: Partial<T> = {}) {
    return assignIn(this, payload);
  }
}
