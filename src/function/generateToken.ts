import jwt from 'jsonwebtoken'
import { iUser } from '../interface/iUser'

export const generateToken = async (user: iUser): Promise<string> => {
     return jwt.sign(
          {
               _id: user?._id,
               // roleId: user?.roleId
          },
          process.env.SECRET_KEY,
          { expiresIn: process.env.EXPIRED_TOKEN_TIME }
     )
}