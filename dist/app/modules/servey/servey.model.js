"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Servey = void 0;
const mongoose_1 = require("mongoose");
const serveySchema = new mongoose_1.Schema({
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
exports.Servey = (0, mongoose_1.model)('Servey', serveySchema);
