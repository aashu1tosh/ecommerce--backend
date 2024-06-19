import { type Request, type Response } from "express";
import { StatusCodes } from "../constant/statusCodes";
import adminService from "../services/admin.service";

class AdminController {
    async getAll(req: Request, res: Response) {
        const response = await adminService.getAll();
        res.status(StatusCodes.ACCEPTED).json({
            success: true,
            message: "Fetch Successful",
            main: { response }
        })
    }

    async resetPassword(req: Request, res: Response) {
        const response = await adminService.resetPassword();
        res.status(StatusCodes.ACCEPTED).json({
            success: true,
            message: "Password Reset Successful",
            main: null
        })
    }

}

export default AdminController