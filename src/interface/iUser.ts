import { ObjectId } from "mongodb"
interface iUser {
    _id: ObjectId
    username: string
    type: 'Normal' | 'Maintenance' | 'Owner'

    tell: string
    gender: 'Male' | 'Female'
    email: string
    password: string
    imageSrc: string
    isAllow: boolean
    token: string
    lastLogin: Date
    remark: string
    createdBy: iUser
    createdAt: Date
}
export {
    iUser
}