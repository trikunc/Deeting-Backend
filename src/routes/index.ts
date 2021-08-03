import { Request, Response, Router } from "express";
import { WebResponse } from "../models/WebResponse";
import userController from "../controller/user.controller";


const router = Router()

router.get("", (req: Request, res: Response) => {
    return WebResponse.success(res, {
        message: "Hello World!"
    })
})

/**
  * @swagger
  * /users/{id}:
  *  get:
  *    tags:
  *      - "user_service"
  *    summary: "Get User by ID"
  *    description: ""
  *    consumes:
  *      - "application/json"
  *    produces:
  *      - "application/json"
  *    parameters:
  *     - name: "id"
  *       in: "path"
  *       type : "integer"
  *       description: "User ID"
  *       required: true
  *    responses:
  *      '200':
  *        description: "A successful response"
  *      '500':
  *        description: "Internal server error"
  */
router.get("/users/:id", userController.getUser)



export default router;