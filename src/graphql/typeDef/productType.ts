export default `#graphql
     type Product {
          _id: ID
          product_name: String
          type_cash: String
          image: String
          price: Float
     }
     input ProductInput {
          product_name: String
          type_cash: String
          image: String
          price: Float
     }
     type Response {
          status: Boolean
          message: String
     }
     type Query {
          getUserPagination(page: Int, limit: Int, pagination: Boolean, keyword: String, isAllow: Boolean): UserPagiantion
          getProduct:[Product]  
     }
     type Mutation {
          createProduct(input: ProductInput): Response
          updateProduct(id:ID input: ProductInput): Response
          deleteProduct(id:ID): Response
     }
`