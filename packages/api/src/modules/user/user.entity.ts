import { BaseEntity } from '@api/utils';
import {
  Column,
  Entity,
} from 'typeorm';
import { UserDto } from './user.dto';

@Entity()
export class UserEntity extends BaseEntity implements UserDto {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  externalId: string;
}
