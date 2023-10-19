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
exports.AnalyticsService = void 0;
const analytics_generator_1 = require("../../../utils/analytics.generator");
const booking_model_1 = require("../bookings/booking.model");
const service_model_1 = require("../service/service.model");
const user_model_1 = __importDefault(require("../user/user.model"));
const getUsersAnalytics = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, analytics_generator_1.generatedLast12MonthData)(user_model_1.default);
    return users;
});
const getCourseAnalytics = () => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield (0, analytics_generator_1.generatedLast12MonthData)(service_model_1.Service);
    return service;
});
const getOrdersAnalytics = () => __awaiter(void 0, void 0, void 0, function* () {
    const bookings = yield (0, analytics_generator_1.generatedLast12MonthData)(booking_model_1.Booking);
    return bookings;
});
exports.AnalyticsService = {
    getUsersAnalytics,
    getCourseAnalytics,
    getOrdersAnalytics,
};
