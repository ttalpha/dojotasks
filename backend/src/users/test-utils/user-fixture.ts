import { User } from '../../../generated/prisma';

export const userFixture = (attrs?: Partial<User>): User => {
  return {
    id: 1,
    email: 'user@email.com',
    password: 'fakepass',
    name: 'Foo Bar',
    ...attrs,
  };
};
