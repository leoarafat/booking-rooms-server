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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const catchasync_1 = __importDefault(require("../../../shared/catchasync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const booking_service_1 = require("./booking.service");
const pagination_1 = __importDefault(require("../../../constants/pagination"));
const pick_1 = __importDefault(require("../../../shared/pick"));
//!
const getAllBookings = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.default);
    const result = yield booking_service_1.BookingService.getAllBookings(paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: `All Booking Retrieved successfully`,
        data: result,
    });
}));
//!
const insertIntoDB = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield booking_service_1.BookingService.insertIntoDB(data);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: `Room Booking successfully`,
        data: result,
    });
}));
//!
const myBookings = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield booking_service_1.BookingService.myBookings(user);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: `Single Booking Data Retrieved successfully`,
        data: result,
    });
}));
//!
const cancelBooking = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield booking_service_1.BookingService.cancelBooking(data);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: `Cancel My Booking successfully`,
        data: result,
    });
}));
//!
const updateBooking = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const id = req.params.id;
    const result = yield booking_service_1.BookingService.updateBooking(id, data);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: ` Booking update successfully`,
        data: result,
    });
}));
//!
const getSIngleBooking = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield booking_service_1.BookingService.getSIngleBooking(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: `Booking data retrieved by id successfully`,
        data: result,
    });
}));
exports.BookingController = {
    insertIntoDB,
    getAllBookings,
    myBookings,
    cancelBooking,
    updateBooking,
    getSIngleBooking,
};
