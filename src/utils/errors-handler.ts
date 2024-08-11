import { NextFunction, Request, Response } from "express";
import AppErrors from "./app-errors";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", err);

  const status = err instanceof AppErrors ? err.statusCode : 500;
  const message =
    err instanceof AppErrors ? err.message : "Internal Server Error";
  const explanation =
    err instanceof AppErrors
      ? err.explanation
      : "An unexpected error occurred.";

  res.status(status).json({ error: message, explanation });
};
