"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const Apierror_1 = __importDefault(require("../../../errors/Apierror"));
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const service_model_1 = require("../service/service.model");
const user_model_1 = __importDefault(require("../user/user.model"));
const booking_model_1 = require("./booking.model");
const sendMail_1 = __importDefault(require("../../../utils/sendMail"));
const notification_model_1 = __importDefault(require("../notification/notification.model"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
//!
const getAllBookings = (paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const result = yield booking_model_1.Booking.find()
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield booking_model_1.Booking.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
//!
const insertIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { serviceId, startDate, endDate, userId, room } = payload;
    // Check if the user and service exist
    const user = (yield user_model_1.default.findById(userId));
    if (!user) {
        throw new Apierror_1.default(404, 'User not found');
    }
    const service = yield service_model_1.Service.findById(serviceId);
    if (!service) {
        throw new Apierror_1.default(404, 'Room not found');
    }
    // Parse the startDate and endDate as Date objects
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);
    // Calculate total price based on the number of days
    const numberOfMilliseconds = parsedEndDate.getTime() - parsedStartDate.getTime();
    const numberOfDays = Math.ceil(numberOfMilliseconds / (1000 * 60 * 60 * 24));
    if (isNaN(numberOfDays) || numberOfDays < 1) {
        throw new Apierror_1.default(400, 'Invalid booking duration');
    }
    const bookingPrice = numberOfDays * service.price;
    const totalPrice = bookingPrice * room;
    // Check if the room is already booked for the specified date range
    const alreadyBookedRooms = yield booking_model_1.Booking.find({
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
        throw new Apierror_1.default(400, 'Rooms are already booked for the specified date range');
    }
    // Create a booking object
    const booking = {
        startDate: parsedStartDate,
        endDate: parsedEndDate,
        totalPrice: totalPrice,
        room: room,
        user: userId,
    };
    // Mail data
    const mailData = {
        order: {
            _id: service._id.toString().slice(0, 6),
            name: service.propertyName,
            price: bookingPrice,
            startDate: parsedStartDate,
            endDate: parsedEndDate,
            date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }),
        },
    };
    yield ejs_1.default.renderFile(path_1.default.join(__dirname, '../../../mails/order-confirmation.ejs'), { order: mailData });
    try {
        if (user || service) {
            yield (0, sendMail_1.default)({
                email: user.email,
                subject: 'Booking Confirmation',
                template: 'order-confirmation.ejs',
                data: mailData,
            });
        }
    }
    catch (error) {
        throw new Apierror_1.default(400, `${error.message}`);
    }
    // Add the booking to the service's bookings array
    const result = (yield booking_model_1.Booking.create(booking)).populate('user');
    yield notification_model_1.default.create({
        user: user === null || user === void 0 ? void 0 : user._id,
        title: 'New Booking',
        message: `You have a new order from ${service === null || service === void 0 ? void 0 : service.propertyName}`,
    });
    return result;
});
//!
//!
const myBookings = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = user;
    console.log(userId);
    const bookings = yield booking_model_1.Booking.find({
        user: userId,
    }).populate('user');
    return bookings;
});
//!
const cancelBooking = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookingId } = data;
    const bookings = yield booking_model_1.Booking.findOneAndDelete(bookingId);
    return bookings;
});
//!
const updateBooking = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const isBooking = yield booking_model_1.Booking.findById(id);
    if (!isBooking) {
        throw new Apierror_1.default(404, 'Booking not found');
    }
    const bookingData = __rest(payload, []);
    const updatedBookingData = Object.assign({}, bookingData);
    const result = yield booking_model_1.Booking.findOneAndUpdate({ _id: id }, updatedBookingData, {
        new: true,
    });
    return result;
});
const getSIngleBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield booking_model_1.Booking.findById(id);
    return service;
});
exports.BookingService = {
    getAllBookings,
    insertIntoDB,
    myBookings,
    cancelBooking,
    updateBooking,
    getSIngleBooking,
};
