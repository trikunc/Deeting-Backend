
import { User } from "entity/User"
import { knex as connection } from "../../database"

const loginService = async (email: string): Promise<User> => {
    let user = await connection<User | Error | undefined>("users").where({
        email: email,
    }).first()
    return user
}

export {
    loginService
}