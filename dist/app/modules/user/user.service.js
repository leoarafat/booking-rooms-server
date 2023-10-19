"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const Apierror_1 = __importDefault(require("../../../errors/Apierror"));
const user_model_1 = __importDefault(require("./user.model"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const user_1 = require("../../../enums/user");
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const isEmailExist = yield user_model_1.default.findOne({ email: userData.email });
    if (isEmailExist) {
        throw new Apierror_1.default(400, 'Email already exist');
    }
    const newUser = yield user_model_1.default.create(userData);
    return newUser;
});
//!
//!
const createAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role } = payload;
    const user = {
        name,
        email,
        password,
        role,
    };
    user.role = user_1.ENUM_USER_ROLE.ADMIN;
    const isEmailExist = yield user_model_1.default.findOne({ email });
    if (isEmailExist) {
        throw new Apierror_1.default(400, 'Email already exist');
    }
    const newUser = yield user_model_1.default.create(user);
    return newUser;
});
//!
//!
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.default.find({});
    return users;
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(user);
    const result = yield user_model_1.default.findById(id);
    // console.log(result);
    return result;
});
const updateProfilePicture = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { avatar } = req.body;
    //@ts-ignore
    const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const user = yield user_model_1.default.findById(userId);
    if (avatar && user) {
        if ((_b = user === null || user === void 0 ? void 0 : user.avatar) === null || _b === void 0 ? void 0 : _b.public_id) {
            yield cloudinary_1.default.v2.uploader.destroy((_c = user === null || user === void 0 ? void 0 : user.avatar) === null || _c === void 0 ? void 0 : _c.public_id);
            const myCloud = yield cloudinary_1.default.v2.uploader.upload(avatar, {
                folder: 'avatars',
                width: 150,
            });
            user.avatar = {
                public_id: myCloud.public_id,
                url: myCloud.url,
            };
        }
        else {
            const myCloud = yield cloudinary_1.default.v2.uploader.upload(avatar, {
                folder: 'avatars',
                width: 150,
            });
            user.avatar = {
                public_id: myCloud.public_id,
                url: myCloud.url,
            };
        }
    }
    yield (user === null || user === void 0 ? void 0 : user.save());
    return user;
});
//!
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.default.findOne({ _id: id });
    if (!isExist) {
        throw new Apierror_1.default(404, 'User not found !');
    }
    const UserData = __rest(payload, []);
    const updatedUserData = Object.assign({}, UserData);
    const result = yield user_model_1.default.findOneAndUpdate({ _id: id }, updatedUserData, {
        new: true,
    });
    return result;
});
//!
const updateUserByAdmin = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.default.findOne({ _id: id });
    if (!isExist) {
        throw new Apierror_1.default(404, 'User not found !');
    }
    const UserData = __rest(payload, []);
    const updatedUserData = Object.assign({}, UserData);
    const result = yield user_model_1.default.findOneAndUpdate({ _id: id }, updatedUserData, {
        new: true,
    });
    return result;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findByIdAndDelete(id);
    return result;
});
exports.UserService = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    updateProfilePicture,
    createAdmin,
    updateUserByAdmin,
};
