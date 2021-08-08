import { Request, Response } from "express";
import { generateAccessToken } from "../../helper/genarateAccessToken";
import { comparePassword } from "../../helper/hashing_password";
import { loginService } from "../../services/auth/auth.service";

class AuthController {
    /**
    * @swagger
    * /login:
    *  post:
    *      description: User Login
    *      tags: [ "auth" ]
    *      consumes: 
    *         - application/json
    *      parameters:
    *          - in: body
    *            name: "Request Body"
    *            description: "User Login"
    *            schema:
    *              type: object
    *              required:
    *                  - username
    *              properties:
    *                  email:
    *                    type: string
    *                  password:
    *                    type: string
    *      responses:
    *          '201':
    *              description: user received and uploaded successfully
    *          '400':
    *              description: user data is missing or invalid
    *          '500':
    *              description: Internal server error
    */
    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        try {
            loginService(email).then(user => {
                comparePassword(password, user.password)
                    .then(isMatch => {
                        let token = generateAccessToken({
                            id: user.id,
                            name: user.username,
                            email: user.email,
                            roles: { name: "admin" } // todo change to roles from database 
                        })

                        return isMatch ? res.json(token) : res.status(401).json({ err: "Password Not Match" })
                    })
            })
        } catch (error) {
            return res.status(400).json({
                message: error.message
            })
        }
    }
}


export default new AuthController();