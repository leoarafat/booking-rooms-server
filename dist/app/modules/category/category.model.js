"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = require("mongoose");
const service_constants_1 = require("../service/service.constants");
// room Schema
const CategorySchema = new mongoose_1.Schema({
    category: {
        type: String,
        enum: service_constants_1.LocationEnum,
        require: true,
    },
    thumbnail: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        },
    },
    services: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Service',
        },
    ],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Category = (0, mongoose_1.model)('Category', CategorySchema);
