import * as fs from 'fs';
import { Request, Response } from 'express';
import { catchError, tap } from 'rxjs/operators';
import { CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor } from '@nestjs/common';
import { APP_HTTP_LOG_PATH } from '../config';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler) {
        return next.handle();
        const { ip, headers, method, originalUrl, body } = context.switchToHttp().getRequest<Request>();
        const date = new Date().toISOString();
        return next.handle().pipe(
            tap(() => {
                const { statusCode } = context.switchToHttp().getResponse<Response>();
                const log = `OK ${date}; ${ip}; ${headers['referer']}; ${method}; ${originalUrl}; ${JSON.stringify(
                    body,
                )}; ${statusCode};\n`;
                this.writeLogs(log);
            }),
            catchError((error) => {
                if (error instanceof HttpException) {
                    const log = `ERROR ${date}; ${ip}; ${
                        headers['referer']
                    }; ${method}; ${originalUrl}; ${JSON.stringify(body)}; ${error.getStatus()}; ${error.message};\n`;
                    this.writeLogs(log);
                } else {
                    this.writeLogs(JSON.stringify(error));
                }
                throw error;
            }),
        );
    }

    private writeLogs(log: string) {
        fs.appendFile(APP_HTTP_LOG_PATH, log, (err) => {
            if (err) {
                console.warn('http logger failed', err);
            }
        });
    }
}
