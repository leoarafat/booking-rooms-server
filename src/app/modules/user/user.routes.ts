import express from 'express';
import { UserController } from './user.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { UserValidation } from './user.validations';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidation.create),
  UserController.createUser,
);
router.put(
  '/update-user-avatar',

  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  UserController.updateProfilePicture,
);
// router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers)
// router.get(
//   '/my-profile',
//   auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.ADMIN),
//   ProfileController.getMyProfile
// )
// router.patch(
//   '/my-profile',
//   validateRequest(ProfileValidation.updateProfileZodSchema),
//   auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
//   ProfileController.updateMyProfile
// )
// router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getSingleUser)
// router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.deleteUser)
// router.patch(
//   '/:id',
//   validateRequest(UserValidation.updateUserZodSchema),
//   auth(ENUM_USER_ROLE.ADMIN),
//   UserController.updateUser
// )

export const UserRoutes = router;
