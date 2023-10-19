"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
    },
    totalPrice: {
        type: Number,
        default: 0,
    },
    room: {
        type: Number,
        default: 1,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'adjusted'],
        default: 'pending',
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Booking = (0, mongoose_1.model)('Booking', bookingSchema);
