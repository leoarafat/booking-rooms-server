"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const analytics_controller_1 = require("./analytics.controller");
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.get('/get-users-analytics', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), analytics_controller_1.AnalyticsController.getUsersAnalytics);
router.get('/get-services-analytics', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), analytics_controller_1.AnalyticsController.getCourseAnalytics);
router.get('/get-bookings-analytics', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), analytics_controller_1.AnalyticsController.getOrdersAnalytics);
exports.AnalyticsRoutes = router;
