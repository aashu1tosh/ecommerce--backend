import express from 'express';
import { ROLE } from '../constant/enum';
import mediaController from '../controllers/media.controller';
import VendorController from '../controllers/vendor.controller';
import { PostItemDTO, PostItemWithMediaDTO } from '../dto/vendor.dto';
import RequestValidator from '../middleware/Request.Validator';
import { authentication } from '../middleware/authentication.middleware';
import { authorization } from '../middleware/authorization.middleware';
import { catchAsync } from '../utils/catchAsync.utils';
import uploadFile from '../utils/fileUploads';

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

router.post(
    '/media-upload',
    uploadFile.single('image'),
    catchAsync(mediaController.create)
);

router.post(
    '/item-with-media',
    uploadFile.single('media'),
    catchAsync(mediaController.createItemWithMedia),
    RequestValidator.validate(PostItemWithMediaDTO),
    catchAsync(vendorController.createItemWithMedia)
);

router.get('/products', catchAsync(vendorController.getAll));

router.delete('/:id', catchAsync(vendorController.deleteItem));

export default router;
