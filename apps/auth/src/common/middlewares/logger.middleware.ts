import * as fs from 'fs';
import { NextFunction, Request, Response } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { APP_HTTP_LOG_PATH } from '../config';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        if (!req || !res) {
            return;
        }
        const { ip, headers, method, originalUrl, body } = req;
        const date = new Date().toISOString();
        const log = `${date}; ${ip}; ${headers['referer']}; ${method}; ${originalUrl}; ${JSON.stringify(body)}; ${
            res.statusCode
        } \n`;
        this.writeLogs(log);
        next();
    }

    private writeLogs(log: string) {
        fs.appendFile(APP_HTTP_LOG_PATH, log, (err) => {
            if (err) {
                console.warn('http logger failed', err);
            }
        });
    }
}
