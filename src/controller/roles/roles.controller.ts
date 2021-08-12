import { User } from "entity/User";
import { NextFunction, Request, Response } from "express"
import { getUser } from "../../services/users/user.services";
import { assignRolesServices, getRolesService, revokeRolesService } from "../../services/roles/roles.service"
import { WebResponse } from "../../models/WebResponse";
import { rolesValidationPost } from "./roles.validation";

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
    async revokeRoles(req: Request, res: Response , next: NextFunction) {
        let { user_id, role_id } = req.body
        try {
            rolesValidationPost(req, res, next)
            await revokeRolesService(user_id, role_id)
            return WebResponse.success(res, {
                message: "Roles Revoked Successfully"
            })
        } catch (error) {
            return WebResponse.error(res, error)
        }
    }
    // Assign User To Role Manager
    async assignRoles(req: Request, res: Response, next: NextFunction) {
        rolesValidationPost(req, res, next)
        let { user_id, role_id } = req.body
        try {
            await assignRolesServices(user_id, role_id)
            return WebResponse.success(res, {
                message: "Roles Assigned Successfully"
            })
        } catch (error) {
            return WebResponse.error(res, error)
        }
    }
}


export default new RolesController()