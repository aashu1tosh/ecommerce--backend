
import express from 'express';
import AuthController from '../controllers/auth.controller';
import { CreateUserDTO } from '../dto/auth.dto';
import RequestValidator from '../middleware/Request.Validator';
import { catchAsync } from '../utils/catchAsync.utils';

const router = express.Router();

const authController = new AuthController()
router.post('/register', RequestValidator.validate(CreateUserDTO), catchAsync(authController.createUser))

export default router;