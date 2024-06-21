import { type NextFunction, type Request, type Response } from 'express';
import { ROLE } from '../constant/enum';
import { Message } from '../constant/messages';
import HttpException from '../utils/HttpException.utils';

export const authorization = (roles: ROLE[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!res.locals.id && !res.locals.role)
            throw HttpException.unauthorized(Message.unAuthorized);
        try {
            const role = res.locals.role;
            if (roles.includes(role)) next();
            else throw HttpException.unauthorized(Message.unAuthorized);
        } catch (error) {
            throw HttpException.unauthorized(Message.unAuthorized);
        }
    };
};
