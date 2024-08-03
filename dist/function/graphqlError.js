"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphqlError = void 0;
const graphql_1 = require("graphql");
const graphqlError = (error) => {
    throw new graphql_1.GraphQLError(error === 'required' ? 'Token is required!' :
        error === 'not activate' ? 'Company not activate' :
            error === 'not found' ? 'User not found!' :
                error === 'not allow' ? 'User not allow!' :
                    error === 'refresh token' ? 'Token expired!' :
                        'Your session expired, please login again', {
        extensions: {
            code: 'Invalid/Expired token'
        }
    });
};
exports.graphqlError = graphqlError;
