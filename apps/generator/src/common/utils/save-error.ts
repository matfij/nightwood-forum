import fs from 'fs';
import { LOGS_DIR } from '../config';
import { Request } from 'express';

export const saveApiError = (req: Request, error: string) => {
    const date = new Date();
    const logData = `${date.toISOString()}; ${req.path}; ${req.ip}; ${JSON.stringify(req.body)}; ${error};\n`;
    saveError(logData);
};

export const saveError = (description: string) => {
    fs.promises
        .access(LOGS_DIR)
        .catch(() => fs.promises.mkdir(LOGS_DIR))
        .finally(() => {
            const date = new Date();
            const logFile = `${LOGS_DIR}/${date.getFullYear()}_${date.getMonth()}_error.logs`;
            fs.appendFile(logFile, description, { encoding: 'utf-8' }, (err) => {
                if (!err) {
                    return;
                }
                console.log('Failed to save log:', err);
            });
        });
};
