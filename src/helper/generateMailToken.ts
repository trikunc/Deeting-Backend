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

export { generateMailToken };
