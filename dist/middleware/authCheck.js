"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../model/user");
const graphqlError_1 = require("../function/graphqlError");
const adminAuth = async (req) => {
    try {
        console.log(req?.headers?.authorization);
        if (!req?.headers?.authorization)
            throw new Error('required');
        const token = req?.headers?.authorization;
        console.log("token==> ", token);
        const decodedUser = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, { ignoreExpiration: true });
        console.log("decodedUser==> ", decodedUser);
        const getUser = await user_1.User.findById({ _id: decodedUser?._id }, {
            isAllow: 1,
            token: 1,
            roleId: 1,
            username: 1,
            imageSrc: 1
        }).populate({ path: 'roleId', select: '_id roleName' });
        if (!getUser)
            throw new Error('not found');
        if (!getUser?.isAllow)
            throw new Error('not allow');
        if (getUser?.token !== token)
            throw new Error('refresh token');
        return {
            _id: decodedUser?._id,
            username: getUser?.username,
            imageSrc: getUser?.imageSrc
        };
    }
    catch (error) {
        (0, graphqlError_1.graphqlError)(error?.message);
    }
};
exports.adminAuth = adminAuth;
