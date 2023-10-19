"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.LayoutService = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const layouts_model_1 = __importStar(require("./layouts.model"));
const Apierror_1 = __importDefault(require("../../../errors/Apierror"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const layout_constants_1 = require("./layout.constants");
const createLayout = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { type } = req.body;
    const isExist = yield layouts_model_1.default.findOne({ type });
    if (isExist) {
        throw new Apierror_1.default(400, `${type} is already exist`);
    }
    if (type === 'Banner') {
        const { image, title, subTitle } = req.body;
        const myCloud = yield cloudinary_1.default.v2.uploader.upload(image, {
            folder: 'layout',
        });
        const banner = {
            type: 'Banner',
            banner: {
                image: {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                },
                title,
                subTitle,
            },
        };
        yield layouts_model_1.default.create(banner);
    }
    if (type === 'FAQ') {
        const { faq } = req.body;
        const faqItems = yield Promise.all(faq.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            return {
                question: item.question,
                answer: item.answer,
            };
        })));
        yield layouts_model_1.default.create({ type: 'FAQ', faq: faqItems });
    }
    if (type === 'Categories') {
        const { categories } = req.body;
        const categoriesItem = yield Promise.all(categories.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            return {
                title: item.title,
            };
        })));
        yield layouts_model_1.default.create({ type: 'Categories', categories: categoriesItem });
    }
});
//!
const createBlog = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const avatar = payload.avatar;
    if (avatar && typeof avatar === 'string') {
        const myCloud = yield cloudinary_1.default.v2.uploader.upload(avatar, {
            folder: 'blog',
        });
        payload.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };
    }
    const result = yield layouts_model_1.Blog.create(payload);
    return result;
});
//!
const updateBlog = (data, blogId) => __awaiter(void 0, void 0, void 0, function* () {
    const avatar = data.avatar;
    const isBlog = yield layouts_model_1.Blog.findById(blogId);
    if (!isBlog) {
        throw new Apierror_1.default(404, 'Blog not found');
    }
    const serviceData = (yield layouts_model_1.Blog.findById(blogId));
    if (avatar && !avatar.startsWith('https')) {
        yield cloudinary_1.default.v2.uploader.destroy(serviceData.avatar.public_url);
        const myCloud = yield cloudinary_1.default.v2.uploader.upload(avatar, {
            folder: 'blog',
        });
        data.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };
        if (avatar.startsWith('https')) {
            data.avatar = {
                public_id: serviceData === null || serviceData === void 0 ? void 0 : serviceData.avatar.public_id,
                url: serviceData === null || serviceData === void 0 ? void 0 : serviceData.avatar.url,
            };
        }
    }
    const blog = yield layouts_model_1.Blog.findByIdAndUpdate(blogId, {
        $set: data,
    }, {
        new: true,
    });
    return blog;
});
//!
const updateLayout = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { type } = req.body;
    if (type === 'Banner') {
        const bannerData = yield layouts_model_1.default.findOne({ type: 'Banner' });
        const { image, title, subTitle } = req.body;
        const data = image.startsWith('https')
            ? bannerData
            : yield cloudinary_1.default.v2.uploader.upload(image, {
                folder: 'layout',
            });
        // const myCloud = await cloudinary.v2.uploader.upload(image, {
        //   folder: "layout",
        // });
        const banner = {
            type: 'Banner',
            image: {
                public_id: image.startsWith('https')
                    ? bannerData.banner.image.public_id
                    : data === null || data === void 0 ? void 0 : data.public_id,
                url: image.startsWith('https')
                    ? bannerData.banner.image.url
                    : data === null || data === void 0 ? void 0 : data.secure_url,
            },
            title,
            subTitle,
        };
        yield layouts_model_1.default.findByIdAndUpdate(bannerData._id, { banner });
    }
    if (type === 'FAQ') {
        const { faq } = req.body;
        const faqItem = yield layouts_model_1.default.findOne({ type: 'FAQ' });
        const faqItems = yield Promise.all(faq.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            return {
                question: item.question,
                answer: item.answer,
            };
        })));
        yield layouts_model_1.default.findByIdAndUpdate(faqItem === null || faqItem === void 0 ? void 0 : faqItem._id, {
            type: 'FAQ',
            faq: faqItems,
        });
    }
    if (type === 'Categories') {
        const { categories } = req.body;
        const categoriesItem = yield layouts_model_1.default.findOne({ type: 'Categories' });
        const categoriesItems = yield Promise.all(categories.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            return {
                title: item.title,
            };
        })));
        yield layouts_model_1.default.findByIdAndUpdate(categoriesItem === null || categoriesItem === void 0 ? void 0 : categoriesItem._id, {
            type: 'Categories',
            categories: categoriesItems,
        });
    }
});
//!
const getLayoutByType = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { type } = req.params;
    const layout = yield layouts_model_1.default.findOne({ type });
    return layout;
});
//!
const getBlog = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: layout_constants_1.blogSearchableFields.map(field => ({
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
    const result = yield layouts_model_1.Blog.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield layouts_model_1.Blog.countDocuments(whereConditions);
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
const getBlogById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const layout = yield layouts_model_1.Blog.findById(id);
    return layout;
});
//!
//!
const deleteBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield layouts_model_1.Blog.findByIdAndDelete(id);
    return result;
});
exports.LayoutService = {
    createLayout,
    updateLayout,
    getLayoutByType,
    createBlog,
    updateBlog,
    getBlog,
    getBlogById,
    deleteBlog,
};
