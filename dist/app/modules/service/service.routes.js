"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const service_controller_1 = require("./service.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const validateRequest_1 = require("../../middlewares/validateRequest");
const service_validations_1 = require("./service.validations");
const router = express_1.default.Router();
router.get('/', service_controller_1.ServiceController.getAllService);
router.post('/create-service', (0, validateRequest_1.validateRequest)(service_validations_1.ServiceValidation.create), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), service_controller_1.ServiceController.createService);
router.post('/addToCart', 
// validateRequest(ServiceValidation.create),
(0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), service_controller_1.ServiceController.addToCart);
router.get('/cart', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), service_controller_1.ServiceController.getMyCart);
router.get('/:id', service_controller_1.ServiceController.getSingleService);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), service_controller_1.ServiceController.deleteService);
router.delete('/:id/cart', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), service_controller_1.ServiceController.removeFromCart);
router.put('/:id/add-comment', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), service_controller_1.ServiceController.addQuestion);
router.put('/:id/add-answer', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), service_controller_1.ServiceController.addQuestionAnswer);
router.put('/:id/add-review', 
// auth(ENUM_USER_ROLE.USER),
service_controller_1.ServiceController.addReviewInService);
router.patch('/update-service/:id', (0, validateRequest_1.validateRequest)(service_validations_1.ServiceValidation.update), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), service_controller_1.ServiceController.updateService);
exports.ServiceRoutes = router;
