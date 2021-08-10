import { User } from "entity/User"
import { Request, Response } from "express"
import { hashingPassword } from "../../helper/hashing_password"
import { WebResponse } from "../../models/WebResponse"
import { getAllUser, getUser as getUserServices, registerUser, updateProfileService } from "../../services/users/user.services"
import { mail } from "../../utils/mail"

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
            // register user
            await registerUser(encrypted)
            // Sending email
            mail(body.email, "Thanks for Registrasion", "Thanks For Registrasion")
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
