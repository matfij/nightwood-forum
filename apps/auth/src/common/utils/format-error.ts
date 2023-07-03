import { GraphQLError } from 'graphql';

export const formatError = (error: GraphQLError) => {
    const originalError = error.extensions?.originalError;

    if (typeof originalError === 'object' && 'message' in originalError && Array.isArray(originalError.message)) {
        const errorMessage = originalError.message.join('\n');
        return {
            message: errorMessage,
            extensions: error.extensions,
        };
    }

    return {
        message: error.message,
        extensions: error.extensions,
    };
};
