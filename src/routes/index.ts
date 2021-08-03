import { Request, Response, Router } from "express";
import { WebResponse } from "../models/WebResponse";
import userController from "../controller/users/user.controller";
import { userValidation } from "../controller/users/user.validation";


const router = Router()

router.get("", (req: Request, res: Response) => {
  return WebResponse.success(res, {
    message: "Hello World!"
  })
})

router.get("/users", userController.users)
router.post("/users", userValidation, userController.createUser)
router.get("/users/:id", userController.getUser)



export default router;