import { knex as connection } from "../../../database"

export const getRolesService = (id: string | number | undefined) => {
    return connection("role_users")
        .join("roles", "role_users.role_id", "=", "roles.id")
        .join("users", "role_users.user_id", "=", "users.id")
        .where({
            "role_users.user_id": id
        })
        .select("role_name")
}