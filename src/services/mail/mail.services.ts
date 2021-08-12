import { User } from 'entity/User';
import { knex as connection } from '../../../database';

const updateActiveUser = async (email: string) => {
  return connection<User>('users')
    .where({
      email: email,
    })
    .update({
      isActive: true,
    });
};

export {
  updateActiveUser,
};
