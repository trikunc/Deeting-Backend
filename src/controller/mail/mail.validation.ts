import { NextFunction, Request, Response } from "express"
import joi from "joi"

const validation = joi.object({
  email: joi.string().email().trim(true).required()
})

export const mailValidation = (req: Request, res: Response, next: NextFunction) => {
  const validationResult = validation.validate({
    email: req.body.email,
  })

  if (validationResult.error) {
    return res.status(400).json({
      message: validationResult.error.message,
    })
  }

  next()
}