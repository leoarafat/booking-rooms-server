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
exports.LayoutController = void 0;
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const layouts_service_1 = require("./layouts.service");
const catchasync_1 = __importDefault(require("../../../shared/catchasync"));
const pagination_1 = __importDefault(require("../../../constants/pagination"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const layout_constants_1 = require("./layout.constants");
const layouts_model_1 = require("./layouts.model");
//create Layout only for admin
const createLayout = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield layouts_service_1.LayoutService.createLayout(req);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Layout create successful',
    });
}));
//!
const createBlog = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield layouts_service_1.LayoutService.createBlog(data);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Blog create successful',
        data: result,
    });
}));
//!
const updateBlog = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const id = req.params.id;
    const result = yield layouts_service_1.LayoutService.updateBlog(data, id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Blog Updated successful',
        data: result,
    });
}));
//!
//create Layout only for admin
const updateLayout = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield layouts_service_1.LayoutService.updateLayout(req);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Layout updated successful',
    });
}));
//!
//create Layout only for admin
const getLayoutByType = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield layouts_service_1.LayoutService.getLayoutByType(req);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Layout retrieved successful',
        data: result,
    });
}));
//!
//get Layout only for admin
const getBlog = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, layout_constants_1.blogFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.default);
    const result = yield layouts_service_1.LayoutService.getBlog(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Blog retrieved successful',
        data: result,
    });
}));
//!
//get Layout only for admin
const getBlogById = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield layouts_service_1.LayoutService.getBlogById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Blog retrieved by id successful',
        data: result,
    });
}));
//!
const deleteBlog = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield layouts_service_1.LayoutService.deleteBlog(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Blog deleted successfully',
        data: result,
    });
}));
//!
// Create a new FAQ entry
const createFAQ = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield layouts_model_1.FAQ.create(data);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Faq create successful',
        data: result,
    });
}));
// Get all FAQ entries
const getAllFAQs = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield layouts_model_1.FAQ.find();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Faq retrieved successful',
        data: result,
    });
}));
exports.LayoutController = {
    createLayout,
    updateLayout,
    getLayoutByType,
    createBlog,
    updateBlog,
    getBlog,
    getBlogById,
    deleteBlog,
    createFAQ,
    getAllFAQs,
};
