import { NextFunction, Request, Response } from "express"
import joi from "joi"

const validation = joi.object({
    email: joi.string().email().trim(true).required(),
    password: joi.string().min(8).trim(true).required(),
})

export const authValidation = (req: Request, res: Response, next: NextFunction) => {
    const validationResult = validation.validate({
        email: req.body.email,
        password: req.body.password,
    })

    if (validationResult.error) {
        return res.status(400).json({
            message: validationResult.error.message,
        })
    }

    next()
}

