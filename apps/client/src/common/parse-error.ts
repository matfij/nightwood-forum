import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

export const parseError = (error: FetchBaseQueryError | SerializedError): string => {
    if ('data' in error && 'message' && typeof error.data === 'object' && error.data && 'message' in error.data) {
        return error.data.message as string;
    }
    return 'Unknown error format';
};
