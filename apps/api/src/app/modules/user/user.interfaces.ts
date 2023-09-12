import { User } from './user.entity';
import type { Request } from 'express';

export type AuthenticatedUser = Pick<User, 'externalId'>;

export interface UserContext {
  req: Request & {
    user: AuthenticatedUser;
  };
}
