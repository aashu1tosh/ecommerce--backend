import { type Request, type Response } from "express";
import { StatusCodes } from "../constant/statusCodes";
// import { AuthService } from '../services/auth.service';
import authServices from '../services/auth.service';

class AuthController {
    async createUser(req: Request, res: Response) {
        await authServices.createUser(req.body);
        res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Created Successfully",
            main: []
        })
    }

    async login(req: Request, res: Response) {
        const user = await authServices.loginUser(req.body)
        res.status(StatusCodes.ACCEPTED).json({
            success: true,
            message: "Login Successful",
            main: [
                user
            ]
        })
    }
}

export default AuthController