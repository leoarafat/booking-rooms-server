"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        email: zod_1.z.string({
            required_error: 'Email  is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
    }),
});
const updateUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({}).optional(),
        location: zod_1.z.string({}).optional(),
        email: zod_1.z.string({}).optional(),
        password: zod_1.z.string({}).optional(),
        avatar: zod_1.z
            .object({
            public_id: zod_1.z.string({}).optional(),
            url: zod_1.z.string({}).optional(),
        })
            .optional(),
        role: zod_1.z.string({}).optional(),
    }),
});
const loginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
    }),
});
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh Token is required',
        }),
    }),
});
exports.UserValidation = {
    create,
    updateUserZodSchema,
    loginZodSchema,
    refreshTokenZodSchema,
};
