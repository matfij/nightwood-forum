import {
    ArgumentsHost,
    BadRequestException,
    Catch,
    ExceptionFilter,
    HttpException,
    ValidationError,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        if (exception instanceof BadRequestException) {
            return response.status(status).json({
                ...(exception.getResponse() as ValidationError),
                path: request.url,
            });
        }
        return response.status(status).json({
            statusCode: status,
            message: [exception.message],
            path: request.url,
        });
    }
}
