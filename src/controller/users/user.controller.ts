import { User } from "entity/User"
import { Request, Response } from "express"
import { hashingPassword } from "../../helper/hashing_password"
import { WebResponse } from "../../models/WebResponse"
import { getAllUser, getUser as getUserServices, registerUser, updateProfileService } from "../../services/user.services"

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
    /**
    * @swagger
    * /users:
    *  post:
    *      description: User registration
    *      tags: [user_service]
    *      consumes: 
    *         - application/json
    *      parameters:
    *          - in: body
    *            name: "Request Body"
    *            description: "User Creation"
    *            schema:
    *              type: object
    *              required:
    *                  - username
    *              properties:
    *                  username:
    *                      type: string
    *                  password:
    *                       type: string
    *                  email:
    *                      type: string
    *                  avatar:
    *                      type: string
    *      responses:
    *          '201':
    *              description: user received and uploaded successfully
    *          '400':
    *              description: user data is missing or invalid
    *          '500':
    *              description: Internal server error
    *      
    *  
    *           
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