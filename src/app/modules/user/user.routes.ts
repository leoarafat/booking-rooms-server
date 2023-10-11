import express from 'express';
import { UserController } from './user.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { UserValidation } from './user.validations';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidation.create),
  UserController.createUser,
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
