import { Request, Response } from "express"
import { WebResponse } from "../models/WebResponse"
import { getAllUser, getUser as getUserServices } from "../services/user.services"

class UserController {
    /**
     * @swagger
     * /users/{id}:
     *  get:
     *    tags:
     *      - "user_service"
     *    summary: "Get User by ID"
     *    description: ""
     *    consumes:
     *      - "application/json"
     *    produces:
     *      - "application/json"
     *    parameters:
     *     - name: "id"
     *       in: "path"
     *       type : "integer"
     *       description: "User ID"
     *       required: true
     *    responses:
     *      '200':
     *        description: "A successful response"
     *      '500':
     *        description: "Internal server error"
     */
    async getUser(req: Request, res: Response) {
        let { id } = req.params
        let user = await getUserServices(id)
        return WebResponse.success(res, user)
    }
    /**
     * @swagger
     * /users:
     *  get:
     *    tags:
     *      - "user_service"
     *    summary: "Get All User"
     *    description: ""
     *    consumes:
     *      - "application/json"
     *    produces:
     *      - "application/json"
     *    responses:
     *      '200':
     *        description: "A successful response"
     *      '500':
     *        description: "Internal server error"
     */
    async users(req: Request, res: Response) {
        let users = await getAllUser()
        return WebResponse.success(res, users)
    }
}

export default new UserController()