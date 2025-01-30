import paginate from "mongoose-paginate-v2"
import { iProduct } from "../interface/iProduct"
import mongoose, { Schema, model } from "mongoose"

const productSchema = new Schema<iProduct>({
    image: String,
    price: Number,
    description: String,
    product_name: String,
    type_cash: { type: String, enum: ["CASH,USD"] },
    category_id: { type: mongoose.Types.ObjectId, ref: "category" },
}, { timestamps: true });
productSchema.plugin(paginate)
const Product = model<iProduct, mongoose.PaginateModel<iProduct>>('product', productSchema)
export { Product } 