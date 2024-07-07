import cors from 'cors';
import express, { Application } from 'express';
import morgan from 'morgan';
import path from 'path';
import { DotenvConfig } from '../config/env.config';
import routes from '../routes/index.route';
import { errorHandler } from './errorHandler.middleware';
import helmet from 'helmet';

const middleware = (app: Application) => {
    const allowedOrigins = DotenvConfig.CORS_ORIGIN;

    app.use(
        cors({
            origin: allowedOrigins,
            allowedHeaders: [
                'access-control-allow-origin',
                'authorization',
                'contact',
            ],
        })
    );

    app.use(helmet());

    app.use(
        express.json({
            limit: '10mb',
        })
    );

    app.use(express.static(path.join(__dirname, '../', '../', 'public/')));

    app.use(morgan('common'));
    app.use('/api/v1', routes);

    app.use(errorHandler);
};

export default middleware;
