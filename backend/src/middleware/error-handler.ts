import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/api-error";
const errorHandler = (
    err: Error | ApiError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let error = err;

    if (!(error instanceof ApiError)) {
        error = new ApiError(500, error.message || "Something went wrong");
    }

    let response = {
        ...error,
        message: error.message,
        statusCode: (error as ApiError).statusCode || 500,
    };
    res.status(response.statusCode).json({
        ...response,
        statusCode: undefined,
    });
};

export default errorHandler;
