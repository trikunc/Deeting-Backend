import { User } from "entity/User"
import { knex as connection } from "../../database"

const registerUser = async (user: User): Promise<User> => {
    return await connection.insert(user)
}
/**
 * get specific user
 * @param {id} id of user
**/
const getUser = async (id: number | string): Promise<User> => {
    return await connection("users").select("*").where({ id }).first()
}

export {
    registerUser,
    getUser
}