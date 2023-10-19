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
exports.CategoryController = void 0;
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const catchasync_1 = __importDefault(require("../../../shared/catchasync"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const category_model_1 = require("./category.model");
const category_service_1 = require("./category.service");
const pick_1 = __importDefault(require("../../../shared/pick"));
const category_constants_1 = require("./category.constants");
const pagination_1 = __importDefault(require("../../../constants/pagination"));
//!
const createCategory = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield category_service_1.CategoryService.createCategory(data);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: `Category created successfully`,
        data: result,
    });
}));
//!
// const updateCategory: RequestHandler = catchAsync(
//   async (req: Request, res: Response) => {
//     const data = req.body;
//     const thumbnail = data?.categoryData.thumbnail;
//     const roomId = req.params.id;
//     const serviceData = (await Category.findById(roomId)) as any;
//     if (
//       thumbnail &&
//       typeof thumbnail === 'string' &&
//       !thumbnail.startsWith('https')
//     ) {
//       await cloudinary.v2.uploader.destroy(serviceData.thumbnail.public_id);
//       const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
//         folder: 'category',
//       });
//       data.thumbnail = {
//         public_id: myCloud.public_id,
//         url: myCloud.secure_url,
//       };
//       if (thumbnail.startsWith('https')) {
//         data.thumbnail = {
//           public_id: serviceData?.thumbnail.public_id,
//           url: serviceData?.thumbnail.url,
//         };
//       }
//     }
//     const service = await Category.findByIdAndUpdate(
//       roomId,
//       {
//         $set: data,
//       },
//       {
//         new: true,
//       },
//     );
//     sendResponse(res, {
//       statusCode: 200,
//       success: true,
//       message: `Category updated successfully`,
//       data: service,
//     });
//   },
// );
//!
//!
const updateCategory = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const thumbnail = data === null || data === void 0 ? void 0 : data.categoryData.thumbnail;
    const roomId = req.params.id;
    const serviceData = (yield category_model_1.Category.findById(roomId));
    if (thumbnail &&
        typeof thumbnail === 'string' &&
        !thumbnail.startsWith('https')) {
        if (serviceData.thumbnail.public_id) {
            yield cloudinary_1.default.v2.uploader.destroy(serviceData.thumbnail.public_id);
        }
        const myCloud = yield cloudinary_1.default.v2.uploader.upload(thumbnail, {
            folder: 'category',
        });
        data.thumbnail = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };
    }
    else if (!thumbnail && serviceData.thumbnail.public_id) {
        // If there's no new thumbnail but there's an existing public_id, retain the old image.
        data.thumbnail = {
            public_id: serviceData.thumbnail.public_id,
            url: serviceData.thumbnail.url,
        };
    }
    const service = yield category_model_1.Category.findByIdAndUpdate(roomId, {
        $set: data,
    }, {
        new: true,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Category updated successfully',
        data: service,
    });
}));
//!
const getAllCategory = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, category_constants_1.categoryFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.default);
    const result = yield category_service_1.CategoryService.getAllCategory(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Category retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
}));
//!
//!
const deleteCategory = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield category_service_1.CategoryService.deleteCategory(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Category deleted successfully',
        data: result,
    });
}));
//!
//!
const getSIngleCategory = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield category_service_1.CategoryService.getSIngleCategory(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: `Category retrieved by id successfully`,
        data: result,
    });
}));
exports.CategoryController = {
    createCategory,
    updateCategory,
    getAllCategory,
    deleteCategory,
    getSIngleCategory,
};
