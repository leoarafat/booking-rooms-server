"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        propertyName: zod_1.z.string({
            required_error: 'propertyName  is required',
        }),
        roomTitle: zod_1.z.string({
            required_error: 'roomTitle summery is required',
        }),
        bedTitle: zod_1.z.string({
            required_error: 'bedTitle id is required',
        }),
        price: zod_1.z.number({
            required_error: 'price id is required',
        }),
        propertyDetails: zod_1.z.string({
            required_error: 'propertyDetails id is required',
        }),
        numberOfGuest: zod_1.z.string({
            required_error: 'numberOfGuest id is required',
        }),
        houseRules: zod_1.z.string({
            required_error: 'houseRules is required',
        }),
        propertyLocation: zod_1.z.string({
            required_error: 'Property Location is required',
        }),
        // thumbnail: z.object({
        //   public_id: z.string({ required_error: 'Public id  is required' }),
        //   url: z.string({ required_error: 'Url  is required' }),
        // }),
        facilities: zod_1.z.string({
            required_error: 'facilities id is required',
        }),
        category: zod_1.z.string({
            required_error: 'category id is required',
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        propertyName: zod_1.z.string({}).optional(),
        roomTitle: zod_1.z.string({}).optional(),
        bedTitle: zod_1.z.string({}).optional(),
        price: zod_1.z.number({}).optional(),
        propertyDetails: zod_1.z.string({}).optional(),
        numberOfGuest: zod_1.z.string({}).optional(),
        houseRules: zod_1.z.string({}).optional(),
        propertyLocation: zod_1.z.string({}).optional(),
        availablity: zod_1.z
            .enum([...Object.values(['Available', 'Unavailable'])])
            .optional(),
        // thumbnail: z
        //   .object({
        //     public_id: z.string({}).optional(),
        //     url: z.string({}).optional(),
        //   })
        //   .optional(),
        facilities: zod_1.z.string({}).optional(),
        category: zod_1.z.string({}).optional(),
    }),
});
exports.ServiceValidation = {
    create,
    update,
};
