import { Request, Response, Router } from "express";
import { WebResponse } from "../models/WebResponse";
import userController from "../controller/users/user.controller";
import { userValidation } from "../controller/users/user.validation";
import authController from "../controller/auth/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { authValidation } from "../controller/auth/auth.validation";
import rolesController from "../controller/roles/roles.controller";


const router = Router()

router.get("", (req: Request, res: Response) => {
  return WebResponse.success(res, {
    message: "Hello World!"
  })
})

// User
router.get("/users",     [authMiddleware], userController.users)
router.post("/users",    [userValidation], userController.createUser)
router.put("/users/:id", [authMiddleware, userValidation], userController.updateProfile)
router.get("/users/:id", [authMiddleware], userController.getUser)

// Auth
router.post("/login", [authValidation], authController.login)
// Roles
router.get("/roles/:user_id", rolesController.getRoles)


export default router;