import { generatedLast12MonthData } from '../../../utils/analytics.generator';
import { Booking } from '../bookings/booking.model';
import { Service } from '../service/service.model';
import User from '../user/user.model';

const getUsersAnalytics = async () => {
  const users = await generatedLast12MonthData(User);
  return users;
};
const getCourseAnalytics = async () => {
  const courses = await generatedLast12MonthData(Service);
  return courses;
};
const getOrdersAnalytics = async () => {
  const orders = await generatedLast12MonthData(Booking);
  return orders;
};

export const AnalyticsService = {
  getUsersAnalytics,
  getCourseAnalytics,
  getOrdersAnalytics,
};
