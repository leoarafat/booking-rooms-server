"use strict";
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
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
exports.ServicesService = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const service_model_1 = require("./service.model");
const category_model_1 = require("../category/category.model");
const Apierror_1 = __importDefault(require("../../../errors/Apierror"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const service_constants_1 = require("./service.constants");
const user_model_1 = __importDefault(require("../user/user.model"));
//!
const createService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryId = payload.category;
    const category = yield category_model_1.Category.findById(categoryId);
    if (!category) {
        throw new Apierror_1.default(404, 'Category not found');
    }
    const thumbnail = payload.thumbnail;
    if (thumbnail && typeof thumbnail === 'string') {
        const myCloud = yield cloudinary_1.default.v2.uploader.upload(thumbnail, {
            folder: 'services',
        });
        payload.thumbnail = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };
    }
    const result = yield (yield service_model_1.Service.create(payload)).populate('category');
    category.services.push(result._id);
    yield category.save();
    return result;
});
//!
const addToCart = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { serviceId, userId } = payload;
    console.log(payload);
    const isExist = yield service_model_1.Cart.findOne({ service: serviceId, user: userId });
    if (isExist) {
        throw new Apierror_1.default(400, 'Service already exists');
    }
    const data = {
        service: serviceId,
        user: userId,
    };
    const result = (yield (yield service_model_1.Cart.create(data)).populate('service')).populate('user');
    return result;
});
//!
const removeFromCart = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.Cart.findByIdAndDelete(id);
    return result;
});
//!
const getMyCart = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = payload;
    const result = yield service_model_1.Cart.find({ user: userId })
        .populate('service')
        .populate('user');
    return result;
});
//!
const getAllService = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, minPrice, maxPrice } = filters, filtersData = __rest(filters, ["searchTerm", "minPrice", "maxPrice"]);
    // console.log(minPrice);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const whereConditions = {};
    if (searchTerm) {
        whereConditions.$or = service_constants_1.servicesSearchableFields.map(field => ({
            [field]: {
                $regex: searchTerm,
                $options: 'i',
            },
        }));
    }
    if (minPrice !== undefined || maxPrice !== undefined) {
        whereConditions.price = {};
        if (minPrice !== undefined) {
            whereConditions.price.$gte = minPrice;
        }
        if (maxPrice !== undefined) {
            whereConditions.price.$lte = maxPrice;
        }
    }
    if (Object.keys(filtersData).length) {
        Object.entries(filtersData).forEach(([field, value]) => {
            whereConditions[field] = value;
        });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const result = yield service_model_1.Service.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .populate('category');
    const total = yield service_model_1.Service.countDocuments(whereConditions);
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
const getSingleService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield service_model_1.Service.findById(id)
        .populate('category')
        .populate('reviews.user')
        .populate('questions.user');
    return service;
});
//!
const addReviewInService = (body, serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    const { rating, review, user } = body;
    // console.log(body);
    const service = yield service_model_1.Service.findById(serviceId)
        .populate('reviews.user')
        .exec();
    if (!service) {
        throw new Apierror_1.default(404, 'Service not found');
    }
    const reviewData = {
        user: user,
        rating,
        comment: review,
    };
    console.log(reviewData);
    const reviews = ((service === null || service === void 0 ? void 0 : service.reviews) || []);
    reviews.push(reviewData);
    let avg = 0;
    reviews.forEach((rev) => {
        avg += rev.rating;
    });
    if (service) {
        service.ratings = avg / reviews.length;
    }
    yield (service === null || service === void 0 ? void 0 : service.save());
    return service;
});
//!
//add question
const addQuestion = (body, serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    const { question, user } = body;
    const service = yield service_model_1.Service.findById(serviceId).populate('questions.user');
    if (!service) {
        throw new Apierror_1.default(404, 'Service not found');
    }
    const newQuestion = {
        user: user,
        question,
        questionReply: [],
    };
    service.questions.push(newQuestion);
    yield (service === null || service === void 0 ? void 0 : service.save());
    // await Notification.create({
    //   user: user?._id,
    //   title: 'New Booking',
    //   message: `You have a new order from ${service?.propertyName}`,
    // });
    return service;
});
//!
// add answer to question course
const addQuestionAnswer = (body, serviceId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { answer, questionId } = body;
    const user = yield user_model_1.default.findById(userId.userId);
    if (!user) {
        throw new Apierror_1.default(404, 'User not found');
    }
    const service = yield service_model_1.Service.findById(serviceId);
    if (!service) {
        throw new Apierror_1.default(404, 'Service not found');
    }
    const question = (_a = service === null || service === void 0 ? void 0 : service.questions) === null || _a === void 0 ? void 0 : _a.find((item) => item._id.equals(questionId));
    // console.log(question.user);
    if (!question) {
        throw new Apierror_1.default(400, 'Invalid question id');
    }
    const newAnswer = {
        user: user,
        answer,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    question.questionReplies.push(newAnswer);
    yield (service === null || service === void 0 ? void 0 : service.save());
    //@ts-ignore
    return service;
});
//!
//!
const deleteService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedService = yield service_model_1.Service.findByIdAndRemove(id);
        if (!deletedService) {
            throw new Apierror_1.default(404, 'Service not found or could not be deleted');
        }
        const categoryId = deletedService.category;
        if (categoryId) {
            const category = yield category_model_1.Category.findById(categoryId);
            if (category) {
                category.services = category.services.filter(serviceId => serviceId.toString() !== id);
                yield category.save();
            }
        }
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.ServicesService = {
    createService,
    getSingleService,
    getAllService,
    addReviewInService,
    addQuestion,
    addQuestionAnswer,
    deleteService,
    addToCart,
    removeFromCart,
    getMyCart,
};
