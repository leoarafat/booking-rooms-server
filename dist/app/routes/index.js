"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../modules/user/user.routes");
const auth_route_1 = require("../modules/auth/auth.route");
const service_routes_1 = require("../modules/service/service.routes");
const booking_routes_1 = require("../modules/bookings/booking.routes");
const category_routes_1 = require("../modules/category/category.routes");
const layouts_routes_1 = require("../modules/layouts/layouts.routes");
const analytics_routes_1 = require("../modules/analytics/analytics.routes");
const servey_routes_1 = require("../modules/servey/servey.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/user',
        route: user_routes_1.UserRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/services',
        route: service_routes_1.ServiceRoutes,
    },
    {
        path: '/category',
        route: category_routes_1.CategoryRoutes,
    },
    {
        path: '/bookings',
        route: booking_routes_1.BookingRoutes,
    },
    {
        path: '/layouts',
        route: layouts_routes_1.LayoutRoutes,
    },
    {
        path: '/analytics',
        route: analytics_routes_1.AnalyticsRoutes,
    },
    {
        path: '/servey',
        route: servey_routes_1.ServeyRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
