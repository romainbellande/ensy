import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { UserCreateDto } from './user.create.dto';
import { User } from './user.entity';
import { UserResolver } from './user.resolver';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([User])],
      resolvers: [
        {
          EntityClass: User,
          DTOClass: User,
          CreateDTOClass: UserCreateDto,
        },
      ],
    }),
  ],
  providers: [UserResolver],
})
export class UserModule {}
