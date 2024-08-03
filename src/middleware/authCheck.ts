import express from 'express'
import jwt from "jsonwebtoken"
import { User } from '../model/user'
import { graphqlError } from '../function/graphqlError'

const adminAuth = async (req: express.Request) => {
     try {
          console.log(req?.headers?.authorization)
          if (!req?.headers?.authorization) throw new Error('required')
          const token = req?.headers?.authorization
          console.log("token==> ", token)
          const decodedUser: any = jwt.verify(token, process.env.SECRET_KEY, { ignoreExpiration: true })
          console.log("decodedUser==> ", decodedUser)

          const getUser = await User.findById({ _id: decodedUser?._id },
               {
                    isAllow: 1,
                    token: 1,
                    roleId: 1,
                    username: 1,
                    imageSrc: 1
               }
          ).populate({ path: 'roleId', select: '_id roleName' })
          if (!getUser) throw new Error('not found')

          if (!getUser?.isAllow) throw new Error('not allow')

          if (getUser?.token !== token) throw new Error('refresh token')

          return {
               _id: decodedUser?._id,
               username: getUser?.username,
               imageSrc: getUser?.imageSrc
          }

     } catch (error) {
          graphqlError(error?.message)
     }
}
export {
     adminAuth
}