"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    product_name: String,
    type_cash: String,
    image: String,
    price: Number,
}, { timestamps: true });
productSchema.plugin(mongoose_paginate_v2_1.default);
const Product = (0, mongoose_1.model)('product', productSchema);
exports.Product = Product;
