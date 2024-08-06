"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    category_name: String,
    remark: String,
}, { timestamps: true });
categorySchema.plugin(mongoose_paginate_v2_1.default);
exports.Category = (0, mongoose_1.model)('category', categorySchema);
