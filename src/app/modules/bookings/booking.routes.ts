import express from 'express';
import { BookingController } from './booking.controller';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';

// import { ServiceController } from './service.controller';

const router = express.Router();

// router.get('/', CategoryController.getAllCategory);

router.post(
  '/',
  // validateRequest(UserValidation.create),
  // auth(ENUM_USER_ROLE.USER),
  BookingController.insertIntoDB,
);
router.get(
  '/my-bookings',
  auth(ENUM_USER_ROLE.ADMIN),
  BookingController.myBookings,
);
router.delete(
  '/cancel-bookings',
  auth(ENUM_USER_ROLE.ADMIN),
  BookingController.cancelBooking,
);
// router.patch(
//   '/update-category/:id',

//   CategoryController.updateCategory,
// );
export const BookingRoutes = router;
