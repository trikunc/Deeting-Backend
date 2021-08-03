import { Request, Response, Router } from "express";
import { WebResponse } from "../models/WebResponse";
import userController from "../controller/user.controller";


const router = Router()

router.get("", (req: Request, res: Response) => {
  return WebResponse.success(res, {
    message: "Hello World!"
  })
})

router.get("/users", userController.users)
router.get("/users/:id", userController.getUser)



export default router;