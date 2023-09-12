import type { Request } from 'express';

import { User } from './user.entity';

export type AuthenticatedUser = Pick<User, 'externalId'>;

export interface UserContext {
  req: Request & {
    user: AuthenticatedUser;
  };
}
