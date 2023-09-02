import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BaseDto } from './base.dto';
import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { IDField } from '@ptc-org/nestjs-query-graphql';

@ObjectType({ isAbstract: true })
export abstract class BaseEntity implements BaseDto {
  @PrimaryGeneratedColumn()
  @IDField(() => ID)
  id!: string;

  @CreateDateColumn()
  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @UpdateDateColumn()
  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}
