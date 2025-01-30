import { ObjectId } from "mongodb"
interface iProduct {
    _id: ObjectId
    product_name: string
    description: string
    category_id: any
    type_cash: string
    image: string
    price: number
}
export {
    iProduct
}