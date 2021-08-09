import { User } from "entity/User";
import { Request, Response } from "express"
import { getUser } from "../../services/users/user.services";
import { getRolesService } from "../../services/roles/roles.service"
import { WebResponse } from "../../models/WebResponse";

type RoleResponse = {
    role_name: string
}

type UserRoleResponse = {
    user: User
    role: string[]
}

class RolesController {

    // Get Roles
    async getRoles(req: Request, res: Response) {
        
        let { user_id } = req.params
        let roles: string[] = [];
        let response: UserRoleResponse

        // Getting The User with Id
        let userResult = await getUser(user_id)

        // get roles
        let result: RoleResponse[] = await getRolesService(user_id)

        // Mapping Roles Response
        result.forEach(element => {
            roles.push(element.role_name)
        });

        response = {
            user: userResult,
            role: roles,
        }

        return WebResponse.success(res, response)


    }
    // Delete Roles From User / Delete Roles
    async revokeRoles(req: Request, res: Response) {

    }
}


export default new RolesController()