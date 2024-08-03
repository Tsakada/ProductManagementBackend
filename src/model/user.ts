import paginate from "mongoose-paginate-v2"
import { iUser } from "../interface/iUser"
import mongoose, { Schema, model } from "mongoose"

const userSchema = new Schema<iUser>({
    username: String,
    tell: String,
    gender: { type: String, enum: ['Male', 'Female'] },
    type: { type: String, enum: ['Maintenance', 'Normal', 'Owner'], default: 'Normal' },
    email: String,
    password: String,
    imageSrc: String,
    remark: String,
    isAllow: { type: Boolean, default: true },
    lastLogin: { type: Date, default: null },
    token: { type: String, default: null },
    createdBy: { type: mongoose.Types.ObjectId, ref: 'user' }
}, { timestamps: true })
userSchema.plugin(paginate)
const User = model<iUser, mongoose.PaginateModel<iUser>>('user', userSchema)
export { User }