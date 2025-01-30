"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = `#graphql
     type Product {
          _id: ID
          product_name: String
          type_cash: String
          category_id: Category
          description: String
          image: String
          price: Float
     }
     input ProductInput { 
          product_name: String
          description: String
          type_cash: String
          category_id: ID
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
`;
