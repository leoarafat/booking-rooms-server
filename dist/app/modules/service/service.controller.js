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
exports.ServiceController = void 0;
const catchasync_1 = __importDefault(require("../../../shared/catchasync"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const service_service_1 = require("./service.service");
const service_model_1 = require("./service.model");
const pick_1 = __importDefault(require("../../../shared/pick"));
const service_constants_1 = require("./service.constants");
const pagination_1 = __importDefault(require("../../../constants/pagination"));
//!
const createService = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield service_service_1.ServicesService.createService(data);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: `Service created successfully`,
        data: result,
    });
}));
//!
const addToCart = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield service_service_1.ServicesService.addToCart(data);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: `Add to cart successfully`,
        data: result,
    });
}));
//!
const removeFromCart = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield service_service_1.ServicesService.removeFromCart(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: `remove from cart successfully`,
        data: result,
    });
}));
//!
const getMyCart = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield service_service_1.ServicesService.getMyCart(data);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: `Retrieved cart successfully`,
        data: result,
    });
}));
//!
//!
const updateService = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const data = (_a = req.body) === null || _a === void 0 ? void 0 : _a.serviceData;
    const thumbnail = data === null || data === void 0 ? void 0 : data.thumbnail;
    const serviceId = req.params.id;
    const serviceData = (yield service_model_1.Service.findById(serviceId));
    if (thumbnail &&
        typeof thumbnail === 'string' &&
        !thumbnail.startsWith('https')) {
        if ((_b = serviceData === null || serviceData === void 0 ? void 0 : serviceData.thumbnail) === null || _b === void 0 ? void 0 : _b.public_id) {
            yield cloudinary_1.default.v2.uploader.destroy((_c = serviceData === null || serviceData === void 0 ? void 0 : serviceData.thumbnail) === null || _c === void 0 ? void 0 : _c.public_id);
        }
        const myCloud = yield cloudinary_1.default.v2.uploader.upload(thumbnail, {
            folder: 'Service',
        });
        data.thumbnail = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };
    }
    else if (!thumbnail && ((_d = serviceData === null || serviceData === void 0 ? void 0 : serviceData.thumbnail) === null || _d === void 0 ? void 0 : _d.public_id)) {
        // If there's no new thumbnail but there's an existing public_id, retain the old image.
        data.thumbnail = {
            public_id: serviceData === null || serviceData === void 0 ? void 0 : serviceData.thumbnail.public_id,
            url: serviceData === null || serviceData === void 0 ? void 0 : serviceData.thumbnail.url,
        };
    }
    const service = yield service_model_1.Service.findByIdAndUpdate(serviceId, {
        $set: data,
    }, {
        new: true,
    }).populate('category');
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Service updated successfully',
        data: service,
    });
}));
//!
const getAllService = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, service_constants_1.servicesFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.default);
    const result = yield service_service_1.ServicesService.getAllService(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Service retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
}));
//!
const getSingleService = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield service_service_1.ServicesService.getSingleService(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: `Service retrieved by id successfully`,
        data: result,
    });
}));
//!
//!
//add review in course
const addReviewInService = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const serviceId = req.params.id;
    const result = yield service_service_1.ServicesService.addReviewInService(body, serviceId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: `Review added successfully`,
        data: result,
    });
}));
//!
//add question
const addQuestion = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const serviceId = req.params.id;
    // const user = req.user;
    const result = yield service_service_1.ServicesService.addQuestion(body, serviceId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: `Question added successfully`,
        data: result,
    });
}));
//!
//add answer in course question
const addQuestionAnswer = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const serviceId = req.params.id;
    const user = req.user;
    const result = yield service_service_1.ServicesService.addQuestionAnswer(body, serviceId, user);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: `Question answer successfully`,
        data: result,
    });
}));
//!
//!
const deleteService = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield service_service_1.ServicesService.deleteService(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Service deleted successfully',
        data: result,
    });
}));
//!
exports.ServiceController = {
    createService,
    addToCart,
    updateService,
    getSingleService,
    getAllService,
    addReviewInService,
    addQuestion,
    addQuestionAnswer,
    deleteService,
    removeFromCart,
    getMyCart,
};
