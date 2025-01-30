import express from "express"
import { respE } from '../../function/resp'
import { iUser } from "../../interface/iUser"
import { Category } from "../../model/category";

export default {
     Query: {
          getCategory: async (_root: undefined, { }, { req }: { req: express.Request }) => {
               try {
                    const data = await Category.find();
                    return data
               } catch (error) {
                    return error
               }
          },
          selectCategory: async (_root: undefined, { }, { req }: { req: express.Request }) => {
               try {
                    const data = await Category.find();
                    return data
               } catch (error) {
                    return error
               }
          },
     },
     Mutation: {
          createCategory: async (_root: undefined, { input }: { input: iUser }, { req }: { req: express.Request }) => {
               try {
                    const newCategory = new Category(input).save()
                    if (newCategory) return {
                         status: true,
                         message: "success",
                    }
                    else return {
                         status: false,
                         message: "error",
                    }
               } catch (error) {
                    return respE(error.message)
               }
          },
          updateCategory: async (_root: undefined, { id, input }: { id: string, input: iUser }, { req }: { req: express.Request }) => {
               try {
                    console.log({ id, input })
                    const newCategory = await Category.findByIdAndUpdate(id, input)

                    console.log("category", newCategory)
                    if (newCategory) return {
                         status: true,
                         message: "success",
                    }

                    else return {
                         status: false,
                         message: "error",
                    }
               } catch (error) {
                    return {
                         status: false,
                         message: "error",
                    }
               }
          },
          deleteCategory: async (_root: undefined, { id, input }: { id: string, input: iUser }, { req }: { req: express.Request }) => {
               try {
                    const newCategory = await Category.findByIdAndDelete(id)
                    if (newCategory) return {
                         status: true,
                         message: "success",
                    }
                    else return {
                         status: false,
                         message: "error",
                    }
               } catch (error) {
                    return respE(error.message)
               }
          },
     }
}