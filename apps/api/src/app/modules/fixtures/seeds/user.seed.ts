import { configuration } from '@/configuration';
import { User } from '../../user';
import { Seed } from '../seed';

const { externalId, email } = configuration().seeds.user;

const defaultUser: User = new User({ email, externalId, name: 'John Doe' });

export const userSeed = new Seed<User>({
  name: User.name,
  itemFn() {
    return defaultUser;
  },
});
