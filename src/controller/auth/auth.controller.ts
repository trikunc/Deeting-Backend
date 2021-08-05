import { Request, Response } from "express";
import { generateAccessToken } from "../../helper/genarateAccessToken";
import { comparePassword } from "../../helper/hashing_password";
import { loginService } from "../../services/auth.service";

class AuthController {
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