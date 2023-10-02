import { Args, Query, Resolver } from '@nestjs/graphql';

import { Auth0Service } from './auth0.service';
import { AccessToken, Auth0User } from './models';
import { Auth0Role } from './models/auth0-role.model';

@Resolver()
export class Auth0Resolver {
  constructor(private readonly service: Auth0Service) {}

  @Query(() => AccessToken)
  login() {
    return this.service.getAccessToken();
  }

  @Query(() => [Auth0User])
  getUsers(@Args('query', { type: () => String }) query: string) {
    return this.service.getUsers(query);
  }

  @Query(() => [Auth0Role])
  getRoles() {
    return this.service.getRoles();
  }
}
