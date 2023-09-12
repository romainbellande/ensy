import { ArgsType } from '@nestjs/graphql';
import { QueryArgsType } from '@ptc-org/nestjs-query-graphql';
import { User } from './user.entity';

@ArgsType()
export class UserQuery extends QueryArgsType(User) {}

export const UserConnection = UserQuery.ConnectionType;
