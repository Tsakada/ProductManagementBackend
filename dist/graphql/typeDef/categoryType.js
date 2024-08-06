"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = `#graphql
     type Category {
          _id: ID
          category_name: String
          remark: String
     }
     input CategoryInput {
          category_name: String
          remark: String
     }
     type Response {
          status: Boolean
          message: String
     }
     type Query {
          getUserPagination(page: Int, limit: Int, pagination: Boolean, keyword: String, isAllow: Boolean): UserPagiantion
          getCategory:[Category]  
     }
     type Mutation {
          createCategory(input: CategoryInput): Response
          updateCategory(id:ID input: CategoryInput): Response
          deleteCategory(id:ID): Response
     }
`;
