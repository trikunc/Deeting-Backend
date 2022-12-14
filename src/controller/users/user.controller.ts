import { User } from 'entity/User';
import { Request, Response } from 'express';
import { generateMailToken } from '../../helper/generateMailToken';
import { hashingPassword } from '../../helper/hashing_password';
import { WebResponse } from '../../models/WebResponse';
import { getAllUser, getUser as getUserServices, registerUser, updatePassword, updateProfileService } from '../../services/users/user.services';
import { updateActiveUser } from '../../services/mail/mail.services'
import { mail } from '../../utils/mail';
import jwt from 'jsonwebtoken';
import { knex as connection } from '../../../database';

class UserController {
  async getUser(req: Request, res: Response) {
    let { id } = req.params;
    let user = await getUserServices(id);
    return WebResponse.success(res, user);
  }

  /**
   * get all user
   */
  async users(req: Request, res: Response) {
    let users = await getAllUser();
    return WebResponse.success(res, users);
  }

  /**
   * Create User
   * @param {Request} req
   * @param {Response} res
   */
  async createUser(req: Request, res: Response) {
    let { body } = req;
    let password = await hashingPassword(req.body.password);

    let encrypted: User = {
      username: body.username,
      email: body.email,
      password: password,
      displayName: body.displayName,
      avatar: body.avatar,
    };

    try {
      // register user
      await registerUser(encrypted);
      // Sending email
      const token = generateMailToken(body.email);
      const url = process.env.NODE_ENV as string === 'prod' ? `${process.env.URL_PROD}/activation/${token}` : `${process.env.URL_DEV}/activation/${token}`;
      mail(
        body.email,
        'Thanks for Registrasion',
        `
            <h1>Thanks For Registrasion<h1/>
            <p>Please activate to link <a href="${url}">${url}</a><p/>
        `
      );
    } catch (error) {
      if (error.code == "ER_DUP_ENTRY") {
        return res.status(403).json({
          message: "Email already registered",
        });
      }
      return res.status(500).json({
        message: error.message,
      });
    }
    return await res.json({
      message: 'User created successfully',
      body: body,
    });
  }

  /**
   * Update profile
   * @param {Request} req
   * @param {Response} res}
   */
  async updateProfile(req: Request, res: Response) {
    let { id } = req.params;
    let { body } = req;
    let password = await hashingPassword(body.password);

    const user: User = {
      username: body.username,
      email: body.email,
      password: password,
      displayName: body.displayName,
      avatar: body.avatar,
    };

    await updateProfileService(parseInt(id), user);

    return WebResponse.success(res, user);
  }

  /**
   * Email Activation
   * @param {Request} req
   * @param {Response} res}
   */
  async mailActivation(req: Request, res: Response) {
    const { token } = req.params;

    jwt.verify(
      token,
      process.env.TOKEN_SECRET as string,
      (err: any, decoded: any) => {
        if (err) {
          console.log('Activation error');
          return res.status(401).json({
            errors: 'Expired link. Signup again',
          });
        } else {
          const { email } = decoded;
          updateActiveUser(email);
          return res.send("Accout Has Active")
        }
      }
    );
  }

  async resetPassword(req: Request, res: Response) {
    let { email } = req.body;
    let test: any

    try {
      // Check email if exist
      let resultUser: User

      connection<User>('users')
        .where({
          email: email,
          // isActive: true,
        })
        .first()
        .then(user => {

          if (!user) return res.status(400).send({ message: "user with given email doesn't exist " });

          let { isActive } = JSON.parse(JSON.stringify(user))
          if (isActive == "false") return res.status(400).send({ message: "please activate your email" });

          else {
            // Generate token
            const token = generateMailToken(email);
            const url = process.env.NODE_ENV as string === 'prod' ? `${process.env.URL_PROD}/password-reset/${token}` : `${process.env.URL_DEV}/password-reset/${token}`;
            console.log(url)
            // Sending email
            console.log(url);
            mail(
              email,
              'Password Reset',
              `
                <h1>Password Reset<h1/>
                <p>Follow this link to reset your password <a href="${url}">${url}</a><p/>
            `
            );
            return res.send("password reset link sent to your email account");
          }
        })

    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }


  async newPassword(req: Request, res: Response) {
    const { token } = req.params;
    let password = await hashingPassword(req.body.password);

    try {
      let verification = await JSON.stringify(jwt.verify(token, process.env.TOKEN_SECRET as string))
      const email = JSON.parse(verification).email;

      updatePassword(email, password);
      return res.send("Password has been updated")

    } catch (e) {
      return res.status(401).json({
        errors: 'invalid link or expired',
      });
    }
  }
}

export default new UserController();
