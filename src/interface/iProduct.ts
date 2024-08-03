import { ObjectId } from "mongodb"
interface iProduct {
    _id: ObjectId
    product_name: string
    type_cash: string
    image: string
    price: number
}
export {
    iProduct
}