import { NextFunction, Request, Response } from "express"
import joi from "joi"


// Validate Assign Role to user
const validatePostRole = joi.object({
    user_id : joi.number().required(),
    role_id : joi.number().required(),
})

export const rolesValidationPost = (req: Request, res: Response, next: NextFunction) => {
    const validationResult = validatePostRole.validate(req.body)

    if (validationResult.error) {
        return res.status(400).send({
            message: validationResult.error.message
        })
    }
}