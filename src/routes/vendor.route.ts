import express from 'express';
import { ROLE } from '../constant/enum';
import VendorController from '../controllers/vendor.controller';
import { PostItemDTO } from '../dto/vendor.dto';
import RequestValidator from '../middleware/Request.Validator';
import { authentication } from '../middleware/authentication.middleware';
import { authorization } from '../middleware/authorization.middleware';
import { catchAsync } from '../utils/catchAsync.utils';

const router = express.Router();

router.use(authentication());
router.use(authorization([ROLE.VENDOR]));
const vendorController = new VendorController();

// Endpoint for posting items
router.post(
    '/item',
    RequestValidator.validate(PostItemDTO),
    catchAsync(vendorController.createItem)
);

router.delete('/:id', catchAsync(vendorController.deleteItem));

export default router;
