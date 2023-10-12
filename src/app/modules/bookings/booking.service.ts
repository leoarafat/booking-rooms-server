/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiError from '../../../errors/Apierror';

import { Service } from '../service/service.model';
import User from '../user/user.model';

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

  const alreadyBookedRooms = await Service.find({
    'bookings.startDate': { $lte: payload.endDate },
    'bookings.endDate': { $gte: payload.startDate },
  });

  if (alreadyBookedRooms.length > 0) {
    // Handle the case where rooms are already booked for the specified date range
    throw new ApiError(
      400,
      'Rooms are already booked for the specified date range',
    );
  }
  //   Create a booking object
  const booking = {
    startDate,
    endDate,
    user: user._id,
  };
  // Add the booking to the service's bookings array
  service.bookings.push(booking);

  // Save the updated service
  await service.save();
  // Return the created booking
  return booking;
};

export const BookingService = {
  insertIntoDB,
};
