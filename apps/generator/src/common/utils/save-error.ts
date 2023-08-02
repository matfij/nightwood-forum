import fs from 'fs';
import { LOGS_DIR } from '../config';
import { Request } from 'express';

export const saveError = (req: Request, error: string) => {
    fs.promises
        .access(LOGS_DIR)
        .catch(() => fs.promises.mkdir(LOGS_DIR))
        .finally(() => {
            const date = new Date();
            const logData = `${date.toISOString()}; ${req.path}; ${req.ip}; ${JSON.stringify(req.body)}; ${error};\n`;
            const logFile = `${LOGS_DIR}/${date.getFullYear()}_${date.getMonth()}_error.logs`;
            fs.appendFile(logFile, logData, { encoding: 'utf-8' }, (err) => {
                if (!err) {
                    return;
                }
                console.log('Failed to save log:', error, err);
            });
        });
};