import express from 'express';
import AuthController from '../controllers/auth.controller';
import {
    CreateUserDTO,
    GoogleLoginDTO,
    LoginUserDTO,
    UpdatePasswordDTO,
} from '../dto/auth.dto';
import RequestValidator from '../middleware/Request.Validator';
import { catchAsync } from '../utils/catchAsync.utils';
import { authentication } from '../middleware/authentication.middleware';

const router = express.Router();

const authController = new AuthController();
// Endpoint for creating user
router.post(
    '/register',
    RequestValidator.validate(CreateUserDTO),
    catchAsync(authController.createUser)
);
// Endpoint for login of user
router.post(
    '/login',
    RequestValidator.validate(LoginUserDTO),
    catchAsync(authController.login)
);
//Endpoint for oauth google
router.post(
    '/google',
    RequestValidator.validate(GoogleLoginDTO),
    catchAsync(authController.googleLogin)
);

router.patch(
    '/update-password',
    RequestValidator.validate(UpdatePasswordDTO),
    authentication(),
    catchAsync(authController.updatePassword)
);

export default router;
