import { type Request, type Response } from "express";
import { StatusCodes } from "../constant/statusCodes";
// import { AuthService } from '../services/auth.service';
import authServices from '../services/auth.service';

class AuthController {
    async createUser(req: Request, res: Response) {
        await authServices.createUser(req.body);
        res.status(StatusCodes.CREATED).json({
            status: true,
            message: "Created Successfully",
            main: []
        })

    }
}

export default AuthController