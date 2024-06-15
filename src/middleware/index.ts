import cors from "cors";
import express, { Application } from "express";
import morgan from 'morgan';
import { DotenvConfig } from "../config/env.config";
import routes from "../routes/index.route";
import { errorHandler } from "./errorHandler.middleware";

const middleware = (app: Application) => {
    const allowedOrigins = DotenvConfig.CORS_ORIGIN

    app.use(cors({
        origin: allowedOrigins,
        allowedHeaders: [
            'access-control-allow-origin',
            'authorization',
            'contact',
        ],
    }))

    app.use(express.json({
        limit: '10mb'
    }))
    app.use(morgan('common'))
    app.use('/api/v1', routes)


    // app.use('/', (_, res: Response) => {
    //     res.render('index')
    // })
    // app.set('view engine', 'ejs');
    // app.set('views', path.join(__dirname, '../', 'views'))

    app.use(errorHandler)


}

export default middleware

