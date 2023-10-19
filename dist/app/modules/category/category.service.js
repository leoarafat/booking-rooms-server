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
exports.CategoryService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const cloudinary_1 = __importDefault(require("cloudinary"));
const category_model_1 = require("./category.model");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const category_constants_1 = require("./category.constants");
const mongoose_1 = __importDefault(require("mongoose"));
const service_model_1 = require("../service/service.model");
const Apierror_1 = __importDefault(require("../../../errors/Apierror"));
const utils_1 = require("../../../utils/utils");
//!
const createCategory = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield category_model_1.Category.findOne({ category: payload.category });
    if (isExist) {
        throw new Apierror_1.default(400, 'Category already exists');
    }
    const thumbnail = payload.thumbnail;
    if (thumbnail && typeof thumbnail === 'string') {
        const myCloud = yield cloudinary_1.default.v2.uploader.upload(thumbnail, {
            folder: 'category',
        });
        payload.thumbnail = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };
    }
    const result = yield category_model_1.Category.create(payload);
    return result;
});
//!
const getAllCategory = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: category_constants_1.categorySearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield category_model_1.Category.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield category_model_1.Category.countDocuments(whereConditions);
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
const deleteCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield category_model_1.Category.findById(id);
    const categoryId = category === null || category === void 0 ? void 0 : category._id;
    if (!category) {
        throw new Apierror_1.default(404, 'Category not found');
    }
    const services = yield service_model_1.Service.find({ category: id });
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        yield (0, utils_1.asyncForEach)(services, (data) => __awaiter(void 0, void 0, void 0, function* () {
            yield service_model_1.Service.deleteMany({ category: data.category });
        }));
        yield category_model_1.Category.findByIdAndDelete(categoryId);
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        console.log(error);
        throw error;
    }
});
//!
//!
const getSIngleCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield category_model_1.Category.findById(id);
    return service;
});
exports.CategoryService = {
    createCategory,
    getAllCategory,
    deleteCategory,
    getSIngleCategory,
};
