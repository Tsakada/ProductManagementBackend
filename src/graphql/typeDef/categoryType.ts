export default `#graphql
     type Category {
          _id: ID
          category_name: String
          remark: String
     }
     type SelectCategory {
          _id: ID
          category_name: String 
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
          selectCategory:[SelectCategory]  
     }
     type Mutation {
          createCategory(input: CategoryInput): Response
          updateCategory(id:ID input: CategoryInput): Response
          deleteCategory(id:ID): Response
     }
`