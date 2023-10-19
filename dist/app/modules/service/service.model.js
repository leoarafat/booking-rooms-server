"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = exports.Service = void 0;
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    rating: {
        type: Number,
        default: 0,
    },
    comment: String,
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
const commentSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    question: String,
    questionReplies: [Object],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
const ServiceSchema = new mongoose_1.Schema({
    propertyName: {
        type: String,
        required: [true, 'propertyName is required'],
    },
    propertyLocation: {
        type: String,
        require: true,
    },
    roomTitle: {
        type: String,
        required: [true, 'roomTitle is required'],
    },
    bedTitle: {
        type: String,
        required: [true, 'bedTitle is required'],
    },
    price: {
        type: Number,
        required: [true, 'price is required'],
    },
    propertyDetails: {
        type: String,
        required: [true, 'propertyDetails is required'],
    },
    availability: {
        type: String,
        enum: ['Available', 'Unavailable'],
        default: 'Available',
    },
    numberOfGuest: {
        type: String,
        required: [true, 'numberOfGuest is required'],
    },
    houseRules: {
        type: String,
        required: [true, 'houseRules is required'],
    },
    thumbnail: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        },
    },
    facilities: {
        type: String,
        required: [true, 'facilities is required'],
    },
    reviews: [reviewSchema],
    questions: [commentSchema],
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    status: {
        type: String,
        enum: ['upcoming', 'in-progress'],
        default: 'in-progress',
    },
    ratings: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
const addToCartSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    service: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Service',
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Service = (0, mongoose_1.model)('Service', ServiceSchema);
exports.Cart = (0, mongoose_1.model)('Cart', addToCartSchema);
