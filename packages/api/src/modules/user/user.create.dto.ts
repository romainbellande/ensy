import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserDto } from './user.dto';

@InputType('CreateUser')
export class UserCreateDto implements Omit<UserDto, 'id' | 'createdAt' | 'updatedAt'> {
  @Field()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  externalId!: string;
}
