import fs from 'fs';
import { NextFunction, Request, Response } from 'express';

export const logger = (req: Request, res: Response, next: NextFunction) => {
    res.on('finish', () => {
        const logData = `${new Date().toISOString()}; ${req.path}; ${req.ip}; ${res.statusCode}; ${JSON.stringify(req.body)};\n`;
        fs.appendFile('http.logs', logData, { encoding: 'utf-8' }, (err) => {
            if (!err) {
                return;
            }
            console.log('Failed to save log:', logData, err);
        });
    });
    next();
};
