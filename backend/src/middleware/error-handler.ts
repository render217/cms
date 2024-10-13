import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/api-error";
import {
    PrismaClientKnownRequestError,
    PrismaClientUnknownRequestError,
} from "@prisma/client/runtime/library";
import { ForbiddenError } from "@casl/ability";
const errorHandler = (
    err: Error | ApiError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let error = err;

    if (error instanceof ForbiddenError) {
        res.status(403).json({
            message: error.message.startsWith("It")
                ? "Access Denied"
                : error.message,
        });
        return;
    }

    if (!(error instanceof ApiError)) {
        const statusCode =
            error instanceof PrismaClientUnknownRequestError ||
            error instanceof PrismaClientKnownRequestError
                ? 400
                : 500;
        const message = error.message || "Something went wrong";
        error = new ApiError(statusCode, message, [], err.stack);
    }

    let response = {
        ...error,
        message: error.message,
        statusCode: (error as ApiError).statusCode || 500,
        ...(process.env.NODE_ENV === "development"
            ? { stack: error.stack }
            : {}),
    };

    console.log(error);
    res.status(response.statusCode).json({
        ...response,
        statusCode: undefined,
    });
};

export default errorHandler;
