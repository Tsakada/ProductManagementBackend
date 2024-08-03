"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../model/user");
const authCheck_1 = require("../../middleware/authCheck");
const customLabels_1 = require("../../function/customLabels");
const resp_1 = require("../../function/resp");
const product_1 = require("../../model/product");
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
        getProduct: async (_root, { page, limit, pagination, keyword, isAllow }, { req }) => {
            try {
                const data = await product_1.Product.find();
                return data;
            }
            catch (error) {
                return error;
            }
        },
    },
    Mutation: {
        createProduct: async (_root, { input }, { req }) => {
            try {
                const newProduct = new product_1.Product(input).save();
                if (newProduct)
                    return {
                        status: true,
                        message: "success",
                    };
                else
                    return {
                        status: false,
                        message: "error",
                    };
            }
            catch (error) {
                return (0, resp_1.respE)(error.message);
            }
        },
        updateProduct: async (_root, { id, input }, { req }) => {
            try {
                const newProduct = await product_1.Product.findByIdAndUpdate(id, input);
                if (newProduct)
                    return {
                        status: true,
                        message: "success",
                    };
                else
                    return {
                        status: false,
                        message: "error",
                    };
            }
            catch (error) {
                return (0, resp_1.respE)(error.message);
            }
        },
        deleteProduct: async (_root, { id, input }, { req }) => {
            try {
                const newProduct = await product_1.Product.findByIdAndDelete(id);
                if (newProduct)
                    return {
                        status: true,
                        message: "success",
                    };
                else
                    return {
                        status: false,
                        message: "error",
                    };
            }
            catch (error) {
                return (0, resp_1.respE)(error.message);
            }
        },
    }
};
