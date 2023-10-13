import express from 'express';
import { UserController } from './user.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { UserValidation } from './user.validations';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(UserValidation.create),
  UserController.createUser,
);
router.post(
  '/create-admin',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(UserValidation.create),
  UserController.createAdmin,
);
router.put(
  '/update-user-avatar',

  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  UserController.updateProfilePicture,
);

router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  UserController.getSingleUser,
);
router.patch(
  '/:id/my-profile',
  validateRequest(UserValidation.updateUserZodSchema),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.updateUser,
);
router.patch(
  '/:id/user-profile',
  validateRequest(UserValidation.updateUserZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.updateUser,
);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.deleteUser);

export const UserRoutes = router;
