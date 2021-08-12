import { User } from 'entity/User';
import { knex as connection } from '../../../database';

/**
 * inser user
 * @param {User} user
 */
const registerUser = async (user: User): Promise<User> => {
  return await connection<User>('users').insert({
    username: user.username,
    displayName: user.displayName,
    email: user.email,
    password: user.password,
    avatar: user.avatar,
  });
};
/**
 * get specific user
 * @param {id} id of user
 **/
const getUser = async (id: number | string): Promise<User> => {
  return await connection('users').select('*').where({ id }).first();
};

/**
 * get all users
 * @return {Array} Collections Of Users
 */
const getAllUser = async (): Promise<User[]> => {
  return await connection('users').select('*').limit(10).orderBy('id', 'desc');
};

/**
 * Upadte the user
 * @param number user id
 * @param {User} user
 */
const updateProfileService = async (userId: number, user: object) => {
  return connection<User>('users')
    .where({
      id: userId,
    })
    .update(user);
};

export {
  registerUser,
  getUser,
  getAllUser,
  updateProfileService,
};
