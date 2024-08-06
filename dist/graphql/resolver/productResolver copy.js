"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resp_1 = require("../../function/resp");
const product_1 = require("../../model/product");
exports.default = {
    Query: {
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
