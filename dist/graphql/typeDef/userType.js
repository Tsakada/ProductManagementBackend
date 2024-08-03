"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = `#graphql
     type User {
          _id: ID
          # product_name: String
          # unit_price: Ints
          # price: Ints
          # remark: String
     }
     type UserPagiantion {
          data: [User]
          # paginator: Paginator
     }
 
     type Response {
          status: Boolean
          message: String
     }
     type Query {
          getUserPagination(page: Int, limit: Int, pagination: Boolean, keyword: String, isAllow: Boolean): UserPagiantion
           
     }
     type Mutation { 
          createUser(input: String): Response
     }
`;
