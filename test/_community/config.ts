import { buildConfig } from '../buildConfig';
import Users from './collections/Users';
import { devUser, regularUser, regularUser2 } from '../credentials';

export default buildConfig({
  // ...extend config here
  collections: [Users],

  onInit: async (payload) => {
    await payload.create({
      collection: 'users',
      data: {
        email: devUser.email,
        password: devUser.password,
      },
    });

    await payload.create({
      collection: 'users',
      data: {
        email: regularUser.email,
        password: regularUser.password,
      },
    });

    await payload.create({
      collection: 'users',
      data: {
        email: regularUser2.email,
        password: regularUser2.password,
      },
    });
  },
});
