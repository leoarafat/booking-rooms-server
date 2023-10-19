"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryValidation = void 0;
const zod_1 = require("zod");
const service_constants_1 = require("../service/service.constants");
const create = zod_1.z.object({
    body: zod_1.z.object({
        category: zod_1.z.enum([...Object.values(service_constants_1.LocationEnum)], { required_error: 'Name  is required' }),
        // thumbnail: z.object({
        //   public_id: z.string({ required_error: 'Public id  is required' }),
        //   url: z.string({ required_error: 'Url  is required' }),
        // }),
        // thumbnail: z.string({
        //   required_error: 'Image  is required',
        // }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        category: zod_1.z
            .enum([...Object.values(service_constants_1.LocationEnum)], {})
            .optional(),
    }),
});
exports.CategoryValidation = {
    create,
    update,
};
