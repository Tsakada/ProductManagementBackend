import paginate from "mongoose-paginate-v2"
import mongoose, { Schema, model } from "mongoose"
import { iCategrory } from "../interface/iCategrory"

const categorySchema = new Schema<iCategrory>({
    category_name: String,
    remark: String,
}, { timestamps: true })
categorySchema.plugin(paginate)
export const Category = model<iCategrory, mongoose.PaginateModel<iCategrory>>('category', categorySchema)
