import { User } from 'entity/User';
import jwt from 'jsonwebtoken';

/**
 * Generate Mail Token
 * @param  {User} user
 *
 */

export const generateMailToken = (
  username: string,
  email: string,
  password: string
) => {
  return jwt.sign(
    { username, email, password },
    process.env.TOKEN_SECRET as string,
    { expiresIn: '1800s', issuer: 'JWT' }
  );
};
