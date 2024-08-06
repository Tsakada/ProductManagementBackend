import paginate from "mongoose-paginate-v2"
import { iUser } from "../interface/iUser"
import mongoose, { Schema, model } from "mongoose"

const userSchema = new Schema<iUser>({
    email: String,
    remark: String,
    username: String,
    password: String,
    imageSrc: String,
    token: { type: String, default: null },
    lastLogin: { type: Date, default: null },
    isAllow: { type: Boolean, default: true },
    createdBy: { type: mongoose.Types.ObjectId, ref: 'user' },
    type: { type: String, enum: ['Maintenance', 'Normal', 'Owner'], default: 'Normal' },
}, { timestamps: true })
userSchema.plugin(paginate)
const User = model<iUser, mongoose.PaginateModel<iUser>>('user', userSchema)
export { User }