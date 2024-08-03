"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../../model/user");
const authCheck_1 = require("../../middleware/authCheck");
const customLabels_1 = require("../../function/customLabels");
const resp_1 = require("../../function/resp");
exports.default = {
    Query: {
        getUserPagination: async (_root, { page, limit, pagination, keyword, isAllow }, { req }) => {
            try {
                const authCheck = await (0, authCheck_1.adminAuth)(req);
                return (0, resp_1.respm)();
                const options = {
                    pagination,
                    customLabels: customLabels_1.customLabels,
                    page: page || 1,
                    limit: limit || 8,
                    sort: { createdAt: -1 },
                    populate: 'roleId'
                };
                const query = {
                    $and: [
                        { type: { $ne: 'Maintenance' } },
                        keyword ? {
                            $expr: {
                                $regexMatch: {
                                    input: { $concat: ['$username', '$tell', '$email'] },
                                    regex: keyword,
                                    options: 'i'
                                }
                            }
                        } : {},
                        isAllow === null ? {} : { isAllow },
                    ]
                };
                const data = await user_1.User.paginate(query, options);
                return data;
            }
            catch (error) {
                return error;
            }
        },
    },
    Mutation: {
        createUser: async (_root, { input }, { req }) => {
            try {
                const authCheck = await (0, authCheck_1.adminAuth)(req);
                return (0, resp_1.respm)();
                const isExist = await user_1.User.countDocuments({ email: input?.email });
                if (isExist > 0)
                    return (0, resp_1.respM)(false, 'អុីម៉ែលស្ទួន', 'This email already exists');
                const salt = await bcrypt_1.default.genSalt(10);
                const newUser = new user_1.User({
                    ...input,
                    email: input?.email?.toLocaleLowerCase(),
                    password: await bcrypt_1.default.hash(input?.password, salt)
                });
                const isSave = await newUser.save();
                if (isSave) {
                    return (0, resp_1.resp)(true);
                }
                return (0, resp_1.resp)(false);
            }
            catch (error) {
                return (0, resp_1.respE)(error.message);
            }
        },
    }
};
