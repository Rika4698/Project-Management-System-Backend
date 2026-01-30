import { Request, Response, NextFunction } from 'express';
import { IGenericErrorResponse, TErrorSources } from '../interfaces/error.interface';

export const errorHandler = (err: any, req: Request, res: Response, _next: NextFunction) => {
    let statusCode = err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);
    let message = err.message || 'Something went wrong!';
    let errorSources: TErrorSources[] = [
        {
            path: '',
            message: err.message || 'Something went wrong!',
        },
    ];



    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        statusCode = 404;
        message = 'Invalid MongoDB ObjectID. Please provide a valid id';
        errorSources = [
            {
                path: err.path,
                message: err.message,
            },
        ];
    }

    

    // Mongoose duplicate key
    if (err.code === 11000) {
        statusCode = 400;
        message = 'Duplicate field value entered';
        errorSources = [
            {
                path: '',
                message: `Duplicate value for ${Object.keys(err.keyValue)}`,
            },
        ];
    }

    // Zod validation error
    if (err.name === 'ZodError') {
        statusCode = 400;
        message = 'Validation Error';
        errorSources = err.issues.map((issue: any) => ({
            path: issue.path[issue.path.length - 1],
            message: issue.message,
        }));
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = 'Validation Error';
        errorSources = Object.values(err.errors).map((val: any) => ({
            path: val.path,
            message: val.message,
        }));
    }

    const errorResponse: IGenericErrorResponse = {
        statusCode,
        message,
        errorSources,
    };

    res.status(statusCode).json({
        ...errorResponse,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};
