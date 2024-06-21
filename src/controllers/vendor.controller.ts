import { type Request, type Response } from 'express';
import { StatusCodes } from '../constant/statusCodes';
import vendorService from '../services/vendor.service';
import HttpException from '../utils/HttpException.utils';

class VendorController {
    async createItem(req: Request, res: Response) {
        const id = res?.locals?.id?.id;
        if (!id) {
            throw HttpException.badRequest("Id couldn't be retrieved");
        }
        await vendorService.createItem(req.body, id);
        res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'Item Post Successful',
            main: null,
        });
    }
}

export default VendorController;
