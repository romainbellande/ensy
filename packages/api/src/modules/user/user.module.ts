import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { UserCreateDto } from './user.create.dto';
import { UserDto } from './user.dto';
import { UserEntity } from './user.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([UserEntity])],
      resolvers: [
        {
          EntityClass: UserEntity,
          DTOClass: UserDto,
          CreateDTOClass: UserCreateDto,
        },
      ],
    }),
  ],
})
export class UserModule {}
