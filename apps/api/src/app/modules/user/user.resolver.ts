import { NotFoundException, UseInterceptors } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { InjectQueryService, QueryService } from '@ptc-org/nestjs-query-core';
import { AuthorizerInterceptor } from '@ptc-org/nestjs-query-graphql';

import { CurrentUser } from './current-user.decorator';
import { User } from './user.entity';
import { AuthenticatedUser } from './user.interfaces';

@Resolver(() => User)
@UseInterceptors(AuthorizerInterceptor(User))
export class UserResolver {
  constructor(
    @InjectQueryService(User) private readonly service: QueryService<User>,
  ) {}

  @Query(() => User)
  async me(@CurrentUser() { externalId }: AuthenticatedUser) {
    const results = await this.service.query({
      filter: { externalId: { eq: externalId } },
    });

    if (results.length === 0) {
      throw new NotFoundException();
    }

    return results[0];
  }
}
