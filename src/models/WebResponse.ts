

import { Response } from 'express'



export class WebResponse {

    // Send a response with the given status code and message
    public static success(res: Response, data: any): Response {
        return res.status(200).json({
            code: res.statusCode,
            message: "Success",
            data: data
        })
    }

    // Send a response with the given status code and message
    public static error(res: Response, data: any): Response {
        return res.status(500).json({
            code: res.statusCode,
            message: "Success",
            data: data
        })
    }

    // Send a response with the given status code and message
    public static notFound(res: Response, data: any): Response {
        return res.status(400).json({
            code: res.statusCode,
            message: "Success",
            data: data
        })
    }
}
