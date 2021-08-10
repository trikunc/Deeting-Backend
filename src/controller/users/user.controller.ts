import { User } from "entity/User"
import { Request, Response } from "express"
import SendingMailService from "../../services/mail/SendingMail"
import { hashingPassword } from "../../helper/hashing_password"
import { WebResponse } from "../../models/WebResponse"
import { getAllUser, getUser as getUserServices, registerUser, updateProfileService } from "../../services/users/user.services"

class UserController {
   async getUser(req: Request, res: Response) {
        let { id } = req.params
        let user = await getUserServices(id)
        return WebResponse.success(res, user)
    }

    /**
     * get all user
    */
   async users(req: Request, res: Response) {
        let users = await getAllUser()
        return WebResponse.success(res, users)
    }

   /**
    * Create User
    * @param {Request} req 
    * @param {Response} res
   */
   async createUser(req: Request, res: Response) {
        let { body } = req
        let password = await hashingPassword(req.body.password)
        let encrypted: User = {
            username: body.username,
            email: body.email,
            password: password,
            displayName: body.displayName,
            avatar: body.avatar
        }

        try {
            await registerUser(encrypted)
            await SendingMailService.sendMail({
                from: "hasryawi@gmail.com",
                to: "hasyrawi@gmail.com", subject: "Terima kasih telah mendaftar", html: "Terima kasih telah mendaftar di kami, silahkan login untuk mengakses aplikasi",
                text: "Test"
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
        return await res.json({
            message: "User created successfully",
            body: body
        })
    }

    /**
     * Update profile
     * @param {Request} req
     * @param {Response} res}
    */
    async updateProfile(req: Request, res: Response) {

        let { id } = req.params
        let { body } = req
        let password = await hashingPassword(body.password)

        const user: User = {
            username: body.username,
            email: body.email,
            password: password,
            displayName: body.displayName,
            avatar: body.avatar
        }

        await updateProfileService(parseInt(id), user)

        return WebResponse.success(res, user)

    }
}

export default new UserController()
