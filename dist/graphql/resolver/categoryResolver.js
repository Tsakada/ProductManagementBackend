"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resp_1 = require("../../function/resp");
const category_1 = require("../../model/category");
exports.default = {
    Query: {
        getCategory: async (_root, {}, { req }) => {
            try {
                const data = await category_1.Category.find();
                return data;
            }
            catch (error) {
                return error;
            }
        },
    },
    Mutation: {
        createCategory: async (_root, { input }, { req }) => {
            try {
                const newCategory = new category_1.Category(input).save();
                if (newCategory)
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
        updateCategory: async (_root, { id, input }, { req }) => {
            try {
                const newCategory = await category_1.Category.findByIdAndUpdate(id, input);
                if (newCategory)
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
        deleteCategory: async (_root, { id, input }, { req }) => {
            try {
                const newCategory = await category_1.Category.findByIdAndDelete(id);
                if (newCategory)
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
