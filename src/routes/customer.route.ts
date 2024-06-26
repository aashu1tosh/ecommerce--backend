import express, { type Response } from 'express';
import { ROLE } from '../constant/enum';
import { authentication } from '../middleware/authentication.middleware';
import { authorization } from '../middleware/authorization.middleware';
import { catchAsync } from '../utils/catchAsync.utils';
import customerController from '../controllers/customer.controller';

const router = express.Router();

router.use(authentication());
router.use(authorization([ROLE.CUSTOMER]));

router.get('/products', catchAsync(customerController.getAll));

export default router;
