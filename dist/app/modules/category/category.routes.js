"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const category_controller_1 = require("./category.controller");
const category_validations_1 = require("./category.validations");
const validateRequest_1 = require("../../middlewares/validateRequest");
const router = express_1.default.Router();
router.get('/', category_controller_1.CategoryController.getAllCategory);
router.post('/create-category', 
// validateRequest(CategoryValidation.create),
(0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), category_controller_1.CategoryController.createCategory);
router.patch('/update-category/:id', (0, validateRequest_1.validateRequest)(category_validations_1.CategoryValidation.update), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), category_controller_1.CategoryController.updateCategory);
router.get('/:id', category_controller_1.CategoryController.getSIngleCategory);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), category_controller_1.CategoryController.deleteCategory);
exports.CategoryRoutes = router;
