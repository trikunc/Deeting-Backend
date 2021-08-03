import { NextFunction, Request, Response } from "express"
import joi from "joi"

const validation = joi.object({
    userName: joi.string().alphanum().min(3).max(25).trim(true).required(),
    email: joi.string().email().trim(true).required(),
    password: joi.string().min(8).trim(true).required(),
})

export const userValidation = (req: Request, res: Response, next: NextFunction) => {
    const validationResult = validation.validate({
        userName: req.body.userName,
        email : req.body.email,
        password: req.body.password,
    })

    if (validationResult.error) {
        return res.status(400).json({
            message: validationResult.error.message,
        })
    }

    next()
}

