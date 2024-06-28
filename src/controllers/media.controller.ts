import { NextFunction, type Request, type Response } from 'express';
import { Message } from '../constant/messages';
import { StatusCodes } from '../constant/statusCodes';
import { ImageInterface } from '../interface/media.interface';
import mediaService from '../services/media.service';
import HttpException from '../utils/HttpException.utils';

class MediaController {
    async create(req: Request, res: Response) {
        if (req.file) {
            const image: ImageInterface = {
                filename: req.file.filename,
                filepath: req.file.path,
            };
            const response = await mediaService.addMedia(image);
            const id = response.id;
            res.status(StatusCodes.CREATED).json({
                status: true,
                message: Message.created,
                main: {
                    mediaId: id,
                },
            });
        } else throw HttpException.badRequest('Please upload a file');
    }

    async createItemWithMedia(req: Request, res: Response, next: NextFunction) {
        if (req.file) {
            const image: ImageInterface = {
                filename: req.file.filename,
                filepath: req.file.path,
            };
            const response = await mediaService.addMedia(image);
            const id = response.id;
            res.locals.mediaId = id;
            next();
        } else throw HttpException.badRequest('Please upload a file');
    }
}

export default new MediaController();
