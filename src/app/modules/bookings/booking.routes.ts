import express from 'express';
import { BookingController } from './booking.controller';

// import { ServiceController } from './service.controller';

const router = express.Router();

// router.get('/', CategoryController.getAllCategory);

router.post(
  '/',
  // validateRequest(UserValidation.create),
  // auth(ENUM_USER_ROLE.USER),
  BookingController.insertIntoDB,
);
// router.patch(
//   '/update-category/:id',

//   CategoryController.updateCategory,
// );
export const BookingRoutes = router;
