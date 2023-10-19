"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'title id is required',
        }),
        description: zod_1.z.string({
            required_error: 'description id is required',
        }),
    }),
});
const faq = zod_1.z.object({
    body: zod_1.z.object({
        question: zod_1.z.string({
            required_error: 'question id is required',
        }),
        answer: zod_1.z.string({
            required_error: 'answer  id is required',
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({}).optional(),
        description: zod_1.z.string({}).optional(),
    }),
});
exports.BlogValidation = {
    create,
    update,
    faq,
};
