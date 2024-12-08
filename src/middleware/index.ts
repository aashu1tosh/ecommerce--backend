import cors from 'cors';
import express, { Application } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import swaggerUI from 'swagger-ui-express';
import { DotenvConfig } from '../config/env.config';
import routes from '../routes/index.route';
import swaggerSpec from '../swagger';
import { errorHandler } from './errorHandler.middleware';

const middleware = (app: Application) => {
    const allowedOrigins = DotenvConfig.CORS_ORIGIN;
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per windowMs
        message:
            'Too many requests from this IP, please try again after 15 minutes.',
        headers: true, // Send rate limit info in response headers
    });

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

    // Apply rate limiting middleware to all requests
    app.use(limiter);

    app.use(
        express.json({
            limit: '10mb',
        })
    );

    app.use(express.static(path.join(__dirname, '../', '../', 'public/')));

    app.use(morgan('common'));
    app.use('/api/v1', routes);

    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '../', 'views'));
    app.get('/', (req, res) => {
        res.render('index');
    });
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))


    app.use(errorHandler)
};

export default middleware;
