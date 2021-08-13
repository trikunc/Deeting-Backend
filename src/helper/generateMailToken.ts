import { User } from 'entity/User';
import jwt from 'jsonwebtoken';

/**
 * Generate Mail Token
 * @param  {User} user
 *
 */

const generateMailToken = (email: string) => {
  return jwt.sign(
    { email },
    process.env.TOKEN_SECRET as string,
    { expiresIn: '1800s', issuer: 'JWT' }
  );
};

const resetPassToken = (id: number, email: string) => {
  let token = jwt.sign(
    { id, email },
    process.env.TOKEN_SECRET as string,
    { expiresIn: '1800s', issuer: 'JWT' }
  );
  return token
};

export { generateMailToken, resetPassToken };
