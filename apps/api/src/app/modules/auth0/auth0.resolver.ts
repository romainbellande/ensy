import { Query, Resolver } from '@nestjs/graphql';

import { Auth0Service } from './auth0.service';
import { AccessToken, Auth0User } from './models';

@Resolver()
export class Auth0Resolver {
  constructor(private readonly service: Auth0Service) {}

  @Query(() => AccessToken)
  login() {
    return this.service.getAccessToken();
  }

  @Query(() => [Auth0User])
  getUsers() {
    return this.service.getUsers();
  }
}
