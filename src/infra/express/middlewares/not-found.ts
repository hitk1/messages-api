import { Request, Response, NextFunction } from "express";

import { AppError } from "@shared/errors/app-error";

export const notFoundApiRoutes = (request: Request, response: Response, next: NextFunction) => {
    throw new AppError(
        "Unless that you've invented the time machinne, this endpoint doesn't exists.",
        404
    )
}