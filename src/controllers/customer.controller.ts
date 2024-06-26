import { type Request, type Response } from 'express';
import { StatusCodes } from '../constant/statusCodes';
import customerService from '../services/customer.service';
import { getPaginationData, paginationValidator } from '../utils/pagination';

class CustomerController {
    async getAll(req: Request, res: Response) {
        const [page, perpage] = paginationValidator(
            req.query.page as string,
            req.query.perpage as string
        );

        const response = await customerService.getAll(page, perpage);

        res.status(StatusCodes.ACCEPTED).json({
            success: true,
            message: 'Data Fetch Success',
            main: {
                data: response.data,
                pagination: getPaginationData(response.total, page, perpage),
            },
        });
    }
}

export default new CustomerController();
