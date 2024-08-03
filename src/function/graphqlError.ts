import { GraphQLError } from "graphql"

const graphqlError = (error: string) => {
    throw new GraphQLError(
        error === 'required' ? 'Token is required!' :
            error === 'not activate' ? 'Company not activate' :
                error === 'not found' ? 'User not found!' :
                    error === 'not allow' ? 'User not allow!' :
                        error === 'refresh token' ? 'Token expired!' :
                            'Your session expired, please login again',
        {
            extensions: {
                code: 'Invalid/Expired token'
            }
        }
    )
}
export { graphqlError } 