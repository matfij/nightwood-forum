import { NextFunction, Response, Request } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    try {
        const status = err.status || 500;
        const message = err.message || 'Something went wrong';
        res.status(status).json({ message });
    } catch (error) {
        next(error);
    }
};
