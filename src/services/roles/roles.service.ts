import { knex as connection } from "../../../database"

type RoleUser = {
    user_id: string | number | undefined,
    role_id: string | number | undefined
}

export const getRolesService = (id: string | number | undefined) => {
    return connection("role_users")
        .join("roles", "role_users.role_id", "=", "roles.id")
        .join("users", "role_users.user_id", "=", "users.id")
        .where({
            "role_users.user_id": id
        })
        .select("role_name")
}

/**
 * Assigna role to a user
 * @param {user_id} user_id 
 * @param {role_id} role_id}
*/
export const assignRolesServices = (user_id: string | number | undefined, role_id: string | number | undefined) => {
    return connection<RoleUser>("role_users")
        .insert({
            user_id: user_id,
            role_id: role_id
        })
        .catch(err => {
            throw err
        })
}

/**
 * Revoke role to a user
 * @param {user_id} user_id 
 * @param {role_id} role_id}
*/
export const revokeRolesService = (user_id: string | number | undefined, role_id: string | number | undefined) => {
    return connection<RoleUser>("role_users")
        .where({
            user_id: user_id,
            role_id: role_id
        })
        .delete()
        .catch(err => {
            throw err
        })
}