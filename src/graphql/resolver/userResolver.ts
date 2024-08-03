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
     },
     Mutation: {
          createUser: async (_root: undefined, { input }: { input: iUser }, { req }: { req: express.Request }) => {
               try {
                    const authCheck = await adminAuth(req)
                    // if (await isNotPermitted(authCheck, 'createUser'))
                    return respm()

                    /* check exist email ------------------------------------------------------------------------ */
                    const isExist = await User.countDocuments({ email: input?.email })
                    if (isExist > 0) return respM(false, 'អុីម៉ែលស្ទួន', 'This email already exists')

                    /* encrypt password ------------------------------------------------------------------------- */
                    const salt = await bcrypt.genSalt(10)

                    /* create user object ----------------------------------------------------------------------- */
                    const newUser = new User({
                         ...input,
                         email: input?.email?.toLocaleLowerCase(),
                         password: await bcrypt.hash(input?.password, salt)
                    })

                    /* save our user into database -------------------------------------------------------------- */
                    const isSave = await newUser.save()
                    if (isSave) {
                         // await addActivity('c', authCheck?._id, `Add new user ${input.username}`)
                         return resp(true)
                    }
                    return resp(false)

               } catch (error) {
                    return respE(error.message)
               }
          },

     }
}