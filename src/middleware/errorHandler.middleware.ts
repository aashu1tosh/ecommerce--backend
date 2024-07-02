import { type NextFunction, type Request, type Response } from 'express';
import { DotenvConfig } from '../config/env.config';

export const errorHandler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let statusCode = 500;
    console.log(DotenvConfig.DEBUG_MODE === 'true')

    console.log(error.message)

    let data = {
        success: false,
        message: 'Error Occurred',
        ...(DotenvConfig.DEBUG_MODE === 'true' && { originalError: error.message })

    };
    if (error?.isOperational || error?.isCustom) {
        statusCode = error.statusCode;
        data = {
            ...data,
            message: error.message,
        };
    }

    return res.status(statusCode).json(data);
};
