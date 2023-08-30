import { saveError } from '../utils/save-error';
import { ApiError } from './api-error';

export const handleProcessError = (error: Error) => {
    if (error instanceof ApiError && error.isOperational) {
        saveError(`${error.name} | ${error.code} | ${error.message} | ${error.stack}\n`);
        return;
    }
    saveError(`Unknown exception | ${error.message} | ${error.stack}\n`);
    process.exit(1);
};
