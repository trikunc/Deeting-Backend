import { User } from "entity/User"
import { knex as connection } from "../../database"

/**
 * inser user
 * @param {User} user
*/
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

/**
 * get all users
 * @return {Array} Collections Of Users 
 */
const getAllUser = async (): Promise<User[]> => {
    return await connection("users").select("*").limit(10).orderBy("id", "desc")
}

export {
    registerUser,
    getUser,
    getAllUser
}