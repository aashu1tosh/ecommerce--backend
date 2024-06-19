import express from 'express'
import AdminController from '../controllers/admin.controller'
import { catchAsync } from '../utils/catchAsync.utils'
import RequestValidator from '../middleware/Request.Validator';
import { ResetPasswordDTO } from '../dto/admin.dto';
import { authentication } from '../middleware/authentication.middleware';
import { authorization } from '../middleware/authorization.middleware';
import { ROLE } from '../constant/enum';

const router = express.Router();

router.use(authentication());
router.use(authorization([ROLE.ADMIN]))

const adminController = new AdminController();

router.get('/', catchAsync(adminController.getAll))

router.post('/reset-password', RequestValidator.validate(ResetPasswordDTO), catchAsync(adminController.resetPassword))

export default router