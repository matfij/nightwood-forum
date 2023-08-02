import { NextFunction, Response, Request } from 'express';
import { saveError } from '../utils/save-error';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    try {
        const status = err.status || 500;
        const message = err.message || 'Something went wrong';
        saveError(req, message);
        res.status(status).send({ message });
    } catch (error) {
        saveError(req, JSON.stringify(error));
        next(error);
    }
};
