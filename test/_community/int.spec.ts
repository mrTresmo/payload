import mongoose from 'mongoose';
import payload from '../../src';
import { initPayloadTest } from '../helpers/configHelpers';
import { regularUser, regularUser2 } from '../credentials';

require('isomorphic-fetch');

let apiUrl;
let jwt;

const headers = {
  'Content-Type': 'application/json',
};
describe('_Community Tests', () => {
  // --__--__--__--__--__--__--__--__--__
  // Boilerplate test setup/teardown
  // --__--__--__--__--__--__--__--__--__
  beforeAll(async () => {
    const { serverURL } = await initPayloadTest({
      __dirname,
      init: { local: false },
    });
    apiUrl = `${serverURL}/api`;

    const response = await fetch(`${apiUrl}/users/login`, {
      body: JSON.stringify({
        email: regularUser.email,
        password: regularUser.password,
      }),
      headers,
      method: 'post',
    });

    const data = await response.json();
    jwt = data.token;
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await payload.mongoMemoryServer.stop();
  });

  it('update another user should fail with error 403', async () => {
    const user = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: regularUser2.email,
        },
      },
      overrideAccess: true,
    });

    const updatedUser = await fetch(`${apiUrl}/users/${user.docs[0].id}`, {
      method: 'PATCH',
      headers: {
        ...headers,
        Authorization: `JWT ${jwt}`,
      },
      body: JSON.stringify({
        firstname: 'firstname',
      }),
    });

    expect(updatedUser.status).toEqual(403);
  });
});
