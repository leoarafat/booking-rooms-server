"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FAQ = exports.Blog = void 0;
const mongoose_1 = require("mongoose");
const faqSchema = new mongoose_1.Schema({
    question: String,
    answer: String,
});
const categorySchema = new mongoose_1.Schema({
    title: { type: String },
});
const bannerImageSchema = new mongoose_1.Schema({
    public_id: { type: String },
    url: { type: String },
});
const layoutSchema = new mongoose_1.Schema({
    type: { type: String },
    faq: [faqSchema],
    categories: [categorySchema],
    banner: {
        image: bannerImageSchema,
        title: { type: String },
        subTitle: {
            type: String,
        },
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
const blogSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    avatar: {
        public_id: {
            type: String,
            // required: true,
        },
        url: {
            type: String,
            // required: true,
        },
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
const Layout = (0, mongoose_1.model)('Layout', layoutSchema);
exports.Blog = (0, mongoose_1.model)('Blog', blogSchema);
exports.FAQ = (0, mongoose_1.model)('FAQ', faqSchema);
exports.default = Layout;
