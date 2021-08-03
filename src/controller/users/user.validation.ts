import { NextFunction, Request, Response } from "express"
import joi from "joi"

const validation = joi.object({
    username: joi.string().alphanum().min(3).max(25).trim(true).required(),
    email: joi.string().email().trim(true).required(),
    password: joi.string().min(8).trim(true).required(),
    displayName : joi.string()
})

export const userValidation = (req: Request, res: Response, next: NextFunction) => {
    const validationResult = validation.validate({
        username: req.body.username,
        email : req.body.email,
        password: req.body.password,
        displayName: req.body.displayName,
    })

    if (validationResult.error) {
        return res.status(400).json({
            message: validationResult.error.message,
        })
    }

    next()
}

