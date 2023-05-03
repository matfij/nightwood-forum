import { NextFunction, Request, Response } from 'express';
import { ValidateError } from 'tsoa';

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ValidateError) {
        console.warn(err.fields);
        return res.status(400).json({
            message: err.message,
            details: err.fields,
        });
    }
    if (err instanceof Error) {
        console.log(err);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
    next();
}
