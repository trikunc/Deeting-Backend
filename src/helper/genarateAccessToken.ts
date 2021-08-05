import { User } from "entity/User";
import jwt from "jsonwebtoken";

/**
 * Generate Access Token
 * @param  {User} user
 * 
*/
export const generateAccessToken = (username: object | string) => {
    return jwt.sign(username, process.env.TOKEN_SECRET as string , {expiresIn : "1800s" ,issuer : "JWT" })
}