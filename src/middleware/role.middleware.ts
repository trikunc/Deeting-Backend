import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

type decodeJWt = {
    roles: string[],
}
/**
 * @author    Hanan asyrawi
 * @param     req: Request
 * @param     res: Response
 * @param     next: NextFunction
 * 
 * middleware for check authentication 
 * 
*/
export const roleMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null || token == " ") {
        return res.status(401).json({
            error: 401,
            message: "Please Provide Token"
        })
    }

    jwt.verify(token, process.env.TOKEN_SECRET as string, (err, decoded) => {
        
        // Make sure the token is valid
        if (typeof decoded == "undefined") {
            return res.status(401).json({
                error: 401,
                message: "Token is Invalid"
            })
        }

        let { roles } = decoded as decodeJWt

        if (!roles.includes("admin")) {
            return res.status(401).json({
                error: 401,
                message: "You are not authorized to access this resource"
            })
        }

        if (err) {
            return res.status(403).json({
                error: err.message,
            })
        }
        next()
    })

}