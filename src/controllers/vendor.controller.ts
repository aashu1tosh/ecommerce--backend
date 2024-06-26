import { type Request, type Response } from 'express';
import { StatusCodes } from '../constant/statusCodes';
import vendorService from '../services/vendor.service';
import HttpException from '../utils/HttpException.utils';

class VendorController {
    async getAll(_: Request, res: Response) {
        const id = res?.locals?.id?.id;
        const response = await vendorService.getAll(id);

        res.status(StatusCodes.ACCEPTED).json({
            success: true,
            message: 'Data Fetch Success',
            main: response,
        });
    }

    async createItem(req: Request, res: Response) {
        const id = res?.locals?.id?.id;
        if (!id) {
            throw HttpException.badRequest("Id couldn't be retrieved");
        }
        await vendorService.createItem(req.body, id);
        res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'Item Post Successful',
        });
    }

    async deleteItem(req: Request, res: Response) {
        const itemId = req?.params.id;
        const vendorId = res?.locals?.id?.id;
        if (!itemId && !vendorId) {
            throw HttpException.badRequest('Error while of vendor or item.');
        }

        await vendorService.deleteItem(itemId, vendorId);
        res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'Item Deletion Successful',
            main: null,
        });
    }
}

export default VendorController;
