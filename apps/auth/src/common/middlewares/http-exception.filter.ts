import {
    ArgumentsHost,
    BadRequestException,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    ValidationError,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        if (!(exception instanceof HttpException)) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: HttpStatus.BAD_REQUEST,
                message: [`unhandled exception: ${exception}`],
                path: request.url,
            });
        }
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
