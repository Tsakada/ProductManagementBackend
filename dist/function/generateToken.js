"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = async (user) => {
    return jsonwebtoken_1.default.sign({
        _id: user?._id,
    }, process.env.SECRET_KEY, { expiresIn: process.env.EXPIRED_TOKEN_TIME });
};
exports.generateToken = generateToken;
