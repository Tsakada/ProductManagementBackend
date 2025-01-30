import bcrypt from 'bcrypt'
import express from "express"
import { User } from "../../model/user"
import { PaginateOptions } from 'mongoose'
import { iUser } from "../../interface/iUser"
import { adminAuth } from '../../middleware/authCheck'
import { customLabels } from "../../function/customLabels"
// import { isNotPermitted } from '../../middleware/permitted'
import { generateToken } from "../../function/generateToken"
import { resp, respE, respm, respM, respMD } from '../../function/resp'
import { Product } from '../../model/product'

export default {
     Query: {
          getUserPagination: async (_root: undefined, { page, limit, pagination, keyword, isAllow }:
               { page: number, limit: number, pagination: boolean, keyword: string, isAllow: boolean },
               { req }: { req: express.Request }
          ) => {
               try {
                    const authCheck = await adminAuth(req)
                    // if (await isNotPermitted(authCheck, 'updateUserIsAllow'))
                    return respm()
                    const options: PaginateOptions = {
                         pagination,
                         customLabels,
                         page: page || 1,
                         limit: limit || 8,
                         sort: { createdAt: -1 },
                         populate: 'roleId'
                    }
                    const query = {
                         $and: [
                              { type: { $ne: 'Maintenance' } },
                              keyword ? {
                                   $expr: {
                                        $regexMatch: {
                                             input: { $concat: ['$username', '$tell', '$email'] },
                                             regex: keyword,
                                             options: 'i'
                                        }
                                   }
                              } : {},
                              isAllow === null ? {} : { isAllow },
                         ]
                    }
                    const data = await User.paginate(query, options)
                    return data
               } catch (error) {
                    return error
               }
          },
          getProduct: async (_root: undefined, { page, limit, pagination, keyword, isAllow }:
               { page: number, limit: number, pagination: boolean, keyword: string, isAllow: boolean },
               { req }: { req: express.Request }
          ) => {
               try {
                    const data = await Product.find().populate("category_id");
                    return data
               } catch (error) {
                    return error
               }
          },
     },
     Mutation: {
          createProduct: async (_root: undefined, { input }: { input: iUser }, { req }: { req: express.Request }) => {
               try {
                    const newProduct = new Product(input).save()
                    if (newProduct) return {
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
          updateProduct: async (_root: undefined, { id, input }: { id: string, input: iUser }, { req }: { req: express.Request }) => {
               try {
                    const newProduct = await Product.findByIdAndUpdate(id, input)
                    if (newProduct) return {
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
          deleteProduct: async (_root: undefined, { id, input }: { id: string, input: iUser }, { req }: { req: express.Request }) => {
               try {
                    const newProduct = await Product.findByIdAndDelete(id)
                    if (newProduct) return {
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