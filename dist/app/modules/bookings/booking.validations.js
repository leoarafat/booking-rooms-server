"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        startDate: zod_1.z.string({ required_error: 'Start Date  is required' }),
        endDate: zod_1.z.string({ required_error: 'End Date  is required' }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z
            .enum([
            ...Object.values(['pending', 'accepted', 'rejected', 'adjusted']),
        ])
            .optional(),
    }),
});
exports.BookingValidation = {
    create,
    update,
};
