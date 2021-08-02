import express, { Application } from "express"
import morgan from "morgan"
import cors from 'cors'
import swaggerJsDoc from "swagger-jsdoc";

import * as swaggerOptions from "../swagger.json";
import * as swaggerUi from "swagger-ui-express";
import router from "./routes/index"

class App {
    /** @var application  contain express instances **/
    private application: Application

    private port: string | number

    constructor() {
        require('dotenv').config()
        this.port = process.env.SERVER_PORT || 3000
        this.application = express()
        this.settings()
        this.routes()
    }
    /** settings @return void   **/
    private settings(): void {
        const swaggerDocs = swaggerJsDoc(swaggerOptions);
        this.application.use(cors())
        this.application.use(morgan('dev'))
        this.application.use(express.json())
        this.application.use(express.urlencoded({ extended: false }))
        this.application.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
    }

    private routes(): void {
        this.application.use("", router)
    }
    
    // Engine Start 🚀 🚀 🚀 🚀 🚀 🚀
    public start(): void {
        this.application.listen(this.port)
        console.log("Server started on port 🚀 " + this.port)
    }
}

export default App