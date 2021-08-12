import { User } from 'entity/User';
import { knex as connection } from '../../../database';

const updateActiveUser = async (username: string, email: string, password: string) => {
  return connection<User>('users')
    .where({
      username: username,
      email: email,
      password: password,
    })
    .update({
      isActive: true,
    });
};

export {
  updateActiveUser,
};
