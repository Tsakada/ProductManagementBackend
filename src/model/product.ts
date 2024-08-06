import paginate from "mongoose-paginate-v2"
import { iProduct } from "../interface/iProduct"
import mongoose, { Schema, model } from "mongoose"

const productSchema = new Schema<iProduct>({
    image: String,
    price: Number,
    type_cash: String,
    product_name: String,
    category_id: { type: mongoose.Types.ObjectId, ref: "category" },
}, { timestamps: true });
productSchema.plugin(paginate)
const Product = model<iProduct, mongoose.PaginateModel<iProduct>>('product', productSchema)
export { Product }