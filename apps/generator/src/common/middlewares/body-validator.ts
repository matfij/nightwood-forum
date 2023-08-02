import { NextFunction, Request, RequestHandler, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { saveError } from '../utils/save-error';

export const bodyValidator = (type: any, skipMissing = false, removeExtra = true): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        const body = plainToInstance(type, req.body);
        validate(body, { skipMissingProperties: skipMissing, whitelist: removeExtra }).then((errors) => {
            if (errors.length > 0) {
                const errorMessage = errors.map((error) => Object.values(error.constraints || '')).join(', ');
                saveError(req, errorMessage);
                return res.status(400).json({ message: errorMessage });
            }
            next();
        });
    };
};
