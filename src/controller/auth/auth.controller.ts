import { Request, Response } from "express";
import { comparePassword } from "../../helper/hashing_password";
import { loginService } from "../../services/auth.service";

class AuthController {
    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        try {
            loginService(email).then(user => {
                comparePassword(password, user.password)
                    .then(isMatch => {
                        return isMatch ? res.json(user) : res.status(401).json({ err: "Password Not Match" })
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