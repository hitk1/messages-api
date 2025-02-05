export class AppError {
    public readonly statusCode: number
    public readonly message: string
    public readonly errorCode: string

    constructor(message: string, statusCode = 400, errorCode = 'error') {
        this.message = message
        this.statusCode = statusCode
        this.errorCode = errorCode
    }
}