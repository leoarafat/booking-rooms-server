import express from 'express';

import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { CategoryController } from './category.controller';

// import { ServiceController } from './service.controller';

const router = express.Router();

router.get('/', CategoryController.getAllCategory);

router.post(
  '/create-category',
  // validateRequest(UserValidation.create),
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.createCategory,
);
router.patch(
  '/update-category/:id',

  CategoryController.updateCategory,
);
export const RoomRoutes = router;
