import { Request, Response } from "express"
import { WebResponse } from "../models/WebResponse"
import { getUser as getUserServices } from "../services/user.services"

class UserController {
    async getUser(req: Request, res: Response) {
        let { id } = req.params
        console.log(id)
        let user = await getUserServices(id)
        return WebResponse.success(res, user)
    }
}

export default new UserController()