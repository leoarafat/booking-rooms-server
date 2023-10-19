"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
// export const isDateRangeAvailable = (
//   service: any,
//   startDate: Date,
//   endDate: Date,
// ) => {
//   for (const booking of service.bookings) {
//     if (
//       (startDate >= booking.startDate && startDate <= booking.endDate) ||
//       (endDate >= booking.startDate && endDate <= booking.endDate) ||
//       (startDate <= booking.startDate && endDate >= booking.endDate) ||
//       (startDate >= booking.startDate && endDate <= booking.endDate)
//     ) {
//       return false; // Date range overlaps with an existing booking
//     }
//   }
//   return true; // Date range is available
// };
// export const checkRoomAvailable = async (data: any) => {
//   const alreadyBookedRoomOnDay =
//     await prisma.offeredCourseClassSchedule.findMany({
//       where: {
//         dayOfWeek: data.dayOfWeek,
//         room: {
//           id: data.roomId,
//         },
//       },
//     });
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRoomAvailable = void 0;
const service_model_1 = require("../app/modules/service/service.model");
const Apierror_1 = __importDefault(require("../errors/Apierror"));
//   const existingSlots = alreadyBookedRoomOnDay.map(schedule => ({
//     startTime: schedule.startTime,
//     endTime: schedule.endTime,
//     dayOfWeek: schedule.dayOfWeek,
//   }));
//   const newSlot = {
//     startTime: data.startTime,
//     endTime: data.endTime,
//     dayOfWeek: data.dayOfWeek,
//   };
//   if (hasTimeConflict(existingSlots, newSlot)) {
//     throw new ApiError(httpStatus.CONFLICT, 'Room is already booked!');
//   }
// };
// Define a function to check room availability
const checkRoomAvailable = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // Find rooms that are already booked for the given date range
    const alreadyBookedRooms = yield service_model_1.Service.find({
        'bookings.startDate': { $lte: data.endDate },
        'bookings.endDate': { $gte: data.startDate },
    });
    if (alreadyBookedRooms.length > 0) {
        // Handle the case where rooms are already booked for the specified date range
        throw new Apierror_1.default(400, 'Rooms are already booked for the specified date range');
    }
});
exports.checkRoomAvailable = checkRoomAvailable;
