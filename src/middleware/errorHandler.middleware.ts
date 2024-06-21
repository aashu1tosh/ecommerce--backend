import { type NextFunction, type Request, type Response } from 'express';

export const errorHandler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let statusCode = 500;
    let data = {
        success: false,
        message: 'Error Occurred',
        main: [],
        // ...(DotenvConfig.DEBUG_MODE === 'true' && { originalError: error.message }),
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
