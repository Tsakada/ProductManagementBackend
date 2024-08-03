import paginate from "mongoose-paginate-v2"
import { iProduct } from "../interface/iProduct"
import mongoose, { Schema, model } from "mongoose"

const productSchema = new Schema<iProduct>({
    product_name: String,
    type_cash: String,
    image: String,
    price: Number,
}, { timestamps: true })
productSchema.plugin(paginate)
const Product = model<iProduct, mongoose.PaginateModel<iProduct>>('product', productSchema)
export { Product }