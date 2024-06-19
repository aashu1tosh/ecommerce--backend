import { type Request, type Response } from "express";
import { StatusCodes } from "../constant/statusCodes";
import adminService from "../services/admin.service";

class AdminController {
  async getAll(req: Request, res: Response) {
    const response = await adminService.getAll();
    res.status(StatusCodes.ACCEPTED).json({
      success: true,
      message: "Fetch Successful",
      main: { response },
    });
  }

  async resetPassword(req: Request, res: Response) {
    await adminService.resetPassword(req.body);
    res.status(StatusCodes.ACCEPTED).json({
      success: true,
      message: "Password Reset Successful",
      main: {},
    });
  }

  // async deleteUser(req: Request, res: Response) {
  //   const id = req.params.id
  //   await adminService.deleteUser(id)
  //   res.status(StatusCodes.ACCEPTED).json({
  //     success: true,
  //     message: "User Deletion Successful",
  //     main: {},
  //   });
  // }
}

export default AdminController;
