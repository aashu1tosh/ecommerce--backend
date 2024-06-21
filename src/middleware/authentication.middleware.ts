import { NextFunction, type Request, type Response } from 'express';
import { Message } from '../constant/messages';
import { IJwtPayload } from '../interface/jwt.interface';
import rolesService from '../services/utils/roles.service';
import webtokenService from '../services/webtoken.service';
import HttpException from '../utils/HttpException.utils';

export const authentication = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(' ');
        try {
            if (!token) {
                throw HttpException.unauthorized(Message.unAuthorized);
            }
            const mode = token[0];
            const accessToken = token[1];
            if (mode !== 'Bearer' || !accessToken)
                throw HttpException.unauthorized(Message.unAuthorized);

            const payload = webtokenService.verify(accessToken) as IJwtPayload;
            const _id = payload?.id as string;
            const role = await rolesService.getRole(_id);

            if (payload) {
                res.locals.id = payload;
                res.locals.role = role;
                next();
            }
        } catch (error) {
            next(HttpException.unauthorized('Not authenticated for this task'));
        }
    };
};
