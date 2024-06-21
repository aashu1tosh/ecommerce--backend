import express from 'express';
import { ROLE } from '../constant/enum';
import AdminController from '../controllers/admin.controller';
import { ResetPasswordDTO } from '../dto/admin.dto';
import RequestValidator from '../middleware/Request.Validator';
import { authentication } from '../middleware/authentication.middleware';
import { authorization } from '../middleware/authorization.middleware';
import { catchAsync } from '../utils/catchAsync.utils';

const router = express.Router();

router.use(authentication());
router.use(authorization([ROLE.ADMIN]));

const adminController = new AdminController();

router.get('/', catchAsync(adminController.getAll));

router.patch(
    '/reset-password',
    RequestValidator.validate(ResetPasswordDTO),
    catchAsync(adminController.resetPassword)
);

router.delete('/:id', catchAsync(adminController.deleteUser));

export default router;
