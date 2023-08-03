import { ApolloError } from '@apollo/client/errors';

export const parseError = (error: ApolloError): string => {
    return error.message ?? 'Unknown error format';
};
