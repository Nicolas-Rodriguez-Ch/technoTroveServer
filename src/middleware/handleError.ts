import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

const handleError: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500).json({ message: err.message });
};

export default handleError;
