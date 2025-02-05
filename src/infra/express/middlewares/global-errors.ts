import z from 'zod'
import { Request, Response, NextFunction } from "express";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { AppError } from '@shared/errors/app-error'
import { appLogger } from '@shared/helpers/logger';


export const globalErrorHandling = (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: error.statusCode,
            error_code: error.errorCode,
            message: error.message
        })
    }

    if (error instanceof z.ZodError) {
        return response.status(400).json({
            status: 'validation_error',
            message: {
                errors: error.issues.map(issue => issue.message),
                path: error?.errors.map(error => error.path.join('.'))
            }
        })
    }

    if (error instanceof PrismaClientKnownRequestError || error.name === 'PrismaClientKnownRequestError') {
        const { code, meta } = error as PrismaClientKnownRequestError

        appLogger.error(
            {
                message: error.message,
                meta,
                code
            }
        )
        let status_code = 400
        let status = 'error'
        let message = 'data manipulation error'
        const { target } = meta as { target: string[] }

        switch (code) {
            case 'P2002':
                status_code = 400
                status = 'unique_constraint_error'
                message = `Data has been recordede already: ${target.join(', s')}`
                break
            default:
                status_code = 500
                status = 'storage_data_manipulation_error'
                message = 'Unexpected error'
                break
        }

        return response.status(status_code).json({
            status,
            message
        })
    }

    appLogger.error(error.stack)

    response.status(500).json({ status: 'error', message: 'Internal server error' })
}