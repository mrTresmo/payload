import { CollectionConfig } from '../../../src/collections/config/types';

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  access: {
    update: ({ req }) => {
      return {
        id: {
          equals: req.user.id,
        },
      };
    },
  },
  fields: [
    {
      name: 'firstname',
      type: 'text',
    },
    {
      name: 'lastname',
      type: 'text',
    },
  ],
};

export default Users;
