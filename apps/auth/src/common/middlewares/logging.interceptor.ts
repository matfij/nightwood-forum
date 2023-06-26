import * as fs from 'fs';
import { catchError, tap } from 'rxjs/operators';
import { CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor } from '@nestjs/common';
import { APP_HTTP_LOG_PATH } from '../config';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler) {
        const gqlContext = GqlExecutionContext.create(context);
        const { ip, headers, method, originalUrl, body } = gqlContext.getContext().req;
        const { user } = gqlContext.getContext();
        const date = new Date().toISOString();
        return next.handle().pipe(
            tap(() => {
                const log = `OK ${date}; ${ip}; ${user?.id}; ${
                    headers['referer']
                }; ${method}; ${originalUrl}; ${JSON.stringify(body)};\n`;
                this.writeLogs(log);
            }),
            catchError((error) => {
                if (error instanceof HttpException) {
                    const log = `ERROR ${date}; ${ip}; ${user?.id}; ${
                        headers['referer']
                    }; ${method}; ${originalUrl}; ${JSON.stringify(body)}; ${error.getStatus()} ${error.message};\n`;
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
