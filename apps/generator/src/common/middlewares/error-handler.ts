import { NextFunction, Response, Request } from 'express';
import { saveApiError } from '../utils/save-error';
import { ApiError } from '../errors/api-error';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    try {
        if (err instanceof ApiError && !err.isOperational) {
            saveApiError(req, err.message);
            process.exit(1);
        }
        const status = err.code || 500;
        const message = err.message || 'Something went wrong';
        saveApiError(req, message);
        res.status(status).send({ message });
    } catch (error) {
        saveApiError(req, JSON.stringify(error));
        next(error);
    }
};
