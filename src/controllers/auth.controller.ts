import { type Request, type Response } from 'express';
import { StatusCodes } from '../constant/statusCodes';
// import { AuthService } from '../services/auth.service';
import { default as authServices } from '../services/auth.service';

class AuthController {
    async createUser(req: Request, res: Response) {
        await authServices.createUser(req.body);
        res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'Created Successfully',
            main: null,
        });
    }

    async requestVerification(req: Request, res: Response) {
        const email = req?.body?.email;
        await authServices.requestVerification(email);
        res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'Created Successfully',
            main: null,
        });
    }

    async verifyEmail(req: Request, res: Response) {}

    async login(req: Request, res: Response) {
        const response = await authServices.loginUser(req.body);
        res.status(StatusCodes.SUCCESS).json({
            success: true,
            message: 'Login Successful',
            main: response,
        });
    }

    async googleLogin(req: Request, res: Response) {
        const user = await authServices.googleLogin(req.body.googleId);
        res.status(StatusCodes.SUCCESS).json({
            success: true,
            message: 'Operation Successful',
            main: user,
        });
    }

    async facebookLogin(req: Request, res: Response) {
        console.log(req);
        res.status(StatusCodes.SUCCESS).json({
            success: true,
            message: 'Operation Successful',
        });
    }

    async updatePassword(req: Request, res: Response) {
        const id = res?.locals?.id?.id;
        await authServices.updatePassword(req.body, id);
        res.status(StatusCodes.SUCCESS).json({
            success: true,
            message: 'Password updated successfully',
        });
    }
}

export default AuthController;
