import { Request, Response, Router } from "express";
import { WebResponse } from "../models/WebResponse";
import userController from "../controller/users/user.controller";
import { userValidation } from "../controller/users/user.validation";
import authController from "../controller/auth/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";


const router = Router()

router.get("", (req: Request, res: Response) => {
  return WebResponse.success(res, {
    message: "Hello World!"
  })
})

router.get("/users", [authMiddleware], userController.users)
router.post("/users", [userValidation], userController.createUser)
router.get("/users/:id", [authMiddleware], userController.getUser)


router.post("/login", authController.login)



export default router;