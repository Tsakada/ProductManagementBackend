import { ObjectId } from "mongodb"
export interface iCategrory {
    _id: ObjectId
    category_name: string
    remark: string
} 