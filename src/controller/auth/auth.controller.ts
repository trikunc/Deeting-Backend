import { Request, Response } from "express";
import { getRolesService } from "../../services/roles/roles.service";
import { generateAccessToken } from "../../helper/genarateAccessToken";
import { comparePassword } from "../../helper/hashing_password";
import { loginService } from "../../services/auth/auth.service";

type RoleResponse = {
    role_name: string;
}

class AuthController {

    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        try {
            let result = await loginService(email)
            let isMatching = await comparePassword(password, result.password)
            let roleResult: RoleResponse[] = await getRolesService(result.id)

            // Manipulate the result to get the role name as single array
            let roles: string[] = []
            roleResult.forEach(role => {
                roles.push(role.role_name)
            })

            // Check the password is correct / or matching
            if (!isMatching) { return res.status(401).json({ err: "Password Not Match" }) }
            if (isMatching) {
                let token = generateAccessToken({
                    id: result.id,
                    name: result.username,
                    email: result.email,
                    roles: roles
                })
                return res.json(token)
            }
        } catch (error) {
            return res.status(400).json({ err: error.message })
        }
    }
}


export default new AuthController();