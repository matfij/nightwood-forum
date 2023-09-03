import fs from 'fs';
import { NextFunction, Request, Response } from 'express';
import { LOGS_DIR } from '../config';

export const logger = (req: Request, res: Response, next: NextFunction) => {
    fs.promises
        .access(LOGS_DIR)
        .catch(() => fs.promises.mkdir(LOGS_DIR))
        .catch((err) => console.log('Could not access log file:', err))
        .finally(() => {
            res.on('finish', () => {
                const date = new Date();
                const logData = `${date.toISOString()}; ${req.path}; ${req.ip}; ${res.statusCode}; ${JSON.stringify(
                    req.body,
                )};\n`;
                const logFile = `${LOGS_DIR}/${date.getFullYear()}_${date.getMonth()}_http.logs`;
                fs.appendFile(logFile, logData, { encoding: 'utf-8' }, (err) => {
                    if (!err) {
                        return;
                    }
                    console.log('Failed to save log:', logData, err);
                });
            });
        });
    next();
};
