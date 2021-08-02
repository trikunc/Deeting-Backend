import { Request, Response, Router } from "express";
import { WebResponse } from "../models/WebResponse";


const router = Router()

router.get("", (req: Request, res: Response) => {
    return WebResponse.success(res, {
        message: "Hello World!"
    })
})

export default router;