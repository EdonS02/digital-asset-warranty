import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../exceptions/HttpException';

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {

  if (error instanceof HttpException) {
    const { statusCode, message, error: errorName } = error.getResponse();
    return res.status(statusCode).json({
      statusCode,
      message,
      error: errorName,
    });
  }

  return res.status(500).json({
    statusCode: 500,
    message: 'Internal server error',
    error: 'Internal Server Error',
  });
};
