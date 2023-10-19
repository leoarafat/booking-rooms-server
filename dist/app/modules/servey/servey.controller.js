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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServeyController = void 0;
const catchasync_1 = __importDefault(require("../../../shared/catchasync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const servey_model_1 = require("./servey.model");
//!
const getAllServey = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield servey_model_1.Servey.find().populate('user');
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: `All Servey Retrieved successfully`,
        data: result,
    });
}));
//!
const insertIntoDB = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield (yield servey_model_1.Servey.create(data)).populate('user');
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: `Successful`,
        data: result,
    });
}));
exports.ServeyController = {
    insertIntoDB,
    getAllServey,
};
