import express from 'express';
import { BookingController } from './booking.controller';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { BookingValidation } from './booking.validations';
import { validateRequest } from '../../middlewares/validateRequest';

const router = express.Router();

router.get('/', auth(ENUM_USER_ROLE.ADMIN), BookingController.getAllBookings);

router.post(
  '/',
  validateRequest(BookingValidation.create),
  auth(ENUM_USER_ROLE.USER),
  BookingController.insertIntoDB,
);
router.get(
  '/my-bookings',
  auth(ENUM_USER_ROLE.USER),
  BookingController.myBookings,
);
router.delete(
  '/cancel-bookings',
  auth(ENUM_USER_ROLE.USER),
  BookingController.cancelBooking,
);
router.patch(
  '/update-category/:id',
  validateRequest(BookingValidation.update),
  auth(ENUM_USER_ROLE.ADMIN),
  BookingController.updateBooking,
);
export const BookingRoutes = router;
