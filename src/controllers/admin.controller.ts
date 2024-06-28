import { type Request, type Response } from 'express';
import { StatusCodes } from '../constant/statusCodes';
import adminService from '../services/admin.service';
import { getPaginationData, paginationValidator } from '../utils/pagination';

class AdminController {
    async getAll(req: Request, res: Response) {
        const [page, perpage] = paginationValidator(
            req.query.page as string,
            req.query.perpage as string
        );
        const response = await adminService.getAll(page, perpage);
        res.status(StatusCodes.SUCCESS).json({
            success: true,
            message: 'Fetch Successful',
            main: {
                data: response.data,
                pagination: getPaginationData(response.total, page, perpage),
            },
        });
    }

    async resetPassword(req: Request, res: Response) {
        await adminService.resetPassword(req.body);
        res.status(StatusCodes.SUCCESS).json({
            success: true,
            message: 'Password Reset Successful',
            main: {},
        });
    }

    async deleteUser(req: Request, res: Response) {
        await adminService.deleteUser(req.params.id);
        res.status(StatusCodes.SUCCESS).json({
            success: true,
            message: 'User Deletion Successful',
            main: {},
        });
    }
}

export default AdminController;
