import { NextFunction, Request, Response } from "express"
import joi from "joi"


const validation = joi.object({
    user_id: joi.string().required(),
    role_name: joi.string().min(8).required(),
})

export const rolesValidation = (req: Request, res: Response, next: NextFunction) => {
    let { user_id, role_name } = req.body

    const validationResult = validation.validate({
        user_id: user_id,
        role_name: role_name
    })


    if (validationResult.error) {
        return res.status(400).json({
            message: validationResult.error.message,
        })
    }

    next()

}