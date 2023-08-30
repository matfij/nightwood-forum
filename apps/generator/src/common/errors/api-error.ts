export enum ApiErrorName {
    NotFound = 'NotFound',
    PermissionDenied = 'PermissionDenied',
    MissingData = 'MissingData',
    NotionConnectionFailed = 'NotionConnectionFailed',
}

export const ApiErrorCode = {
    BadRequest: 400,
};

export class ApiError extends Error {
    readonly name: ApiErrorName;
    readonly code: number;
    readonly message: string;
    readonly isOperational: boolean;

    constructor(name: ApiErrorName, code: number, message: string, isOperational: boolean) {
        super(message);
        this.name = name;
        this.code = code;
        this.message = message;
        this.isOperational = isOperational;

        // make base Error props and methods available on the ApiError (optional)
        Object.setPrototypeOf(this, ApiError.prototype);

        // start tracking call stack from ApiError, omitting base Error detailss (optional)
        Error.captureStackTrace(this);
    }
}
