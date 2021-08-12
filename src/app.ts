import express, { Application } from "express"
import morgan from "morgan"
import cors from 'cors'
import swaggerJsDoc from "swagger-jsdoc";

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
        this.application.use(cors())
        this.application.use(morgan('dev'))
        this.application.use(express.json())
        this.application.use(express.urlencoded({ extended: false }))
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