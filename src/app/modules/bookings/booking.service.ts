/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiError from '../../../errors/Apierror';
import path from 'path';
import ejs from 'ejs';
import { Service } from '../service/service.model';
import User from '../user/user.model';
import { Booking } from './booking.model';
import sendEmail from '../../../utils/sendMail';
import Notification from '../notification/notification.model';

const insertIntoDB = async (payload: any) => {
  const { serviceId, startDate, endDate, userId } = payload;

  // Check if the user and service exist
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  const service = await Service.findById(serviceId);
  if (!service) {
    throw new ApiError(404, 'Room not found');
  }

  // Parse the startDate and endDate as Date objects
  const parsedStartDate = new Date(startDate);
  const parsedEndDate = new Date(endDate);

  // Calculate total price based on the number of days
  const numberOfMilliseconds =
    parsedEndDate.getTime() - parsedStartDate.getTime();
  const numberOfDays = Math.ceil(numberOfMilliseconds / (1000 * 60 * 60 * 24));
  if (isNaN(numberOfDays) || numberOfDays < 1) {
    throw new ApiError(400, 'Invalid booking duration');
  }

  const bookingPrice = numberOfDays * service.price;

  // Check if the room is already booked for the specified date range
  const alreadyBookedRooms = await Booking.find({
    $or: [
      {
        startDate: { $lte: parsedEndDate },
        endDate: { $gte: parsedStartDate },
      },
      {
        startDate: { $gte: parsedEndDate }, // Check if startDate is after endDate
      },
    ],
  });

  if (alreadyBookedRooms.length > 0) {
    throw new ApiError(
      400,
      'Rooms are already booked for the specified date range',
    );
  }

  // Create a booking object
  const booking = {
    startDate: parsedStartDate,
    endDate: parsedEndDate,
    totalPrice: bookingPrice,
    user: user._id,
  };
  // Mail data
  const mailData = {
    order: {
      _id: service._id.toString().slice(0, 6),
      name: service.propertyName,
      price: bookingPrice,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    },
  };
  await ejs.renderFile(
    path.join(__dirname, '../../../mails/order-confirmation.ejs'),
    { order: mailData },
  );
  try {
    if (user) {
      await sendEmail({
        email: user.email,
        subject: 'Booking Confirmation',
        template: 'order-confirmation.ejs',
        data: mailData,
      });
    }
  } catch (error: any) {
    throw new ApiError(400, `${error.message}`);
  }
  // Add the booking to the service's bookings array
  const result = (await Booking.create(booking)).populate('user');
  await Notification.create({
    user: user?._id,
    title: 'New Booking',
    message: `You have a new order from ${service?.propertyName}`,
  });
  return result;
};

export const BookingService = {
  insertIntoDB,
};
