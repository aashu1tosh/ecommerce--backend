import express from 'express';
import { ROLE } from '../constant/enum';
import { authentication } from '../middleware/authentication.middleware';
import { authorization } from '../middleware/authorization.middleware';

const router = express.Router();

router.use(authentication());
router.use(authorization([ROLE.VENDOR]));

// Endpoint for creating user
// router.post('/item', RequestValidator.validate(), catchAsync(authController.createUser))

export default router;
