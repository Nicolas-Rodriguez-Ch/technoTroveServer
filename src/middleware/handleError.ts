import { ErrorRequestHandler, Request, Response } from 'express';

const handleError: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response
) => {
  res.status(500).json({ message: err.message });
};

export default handleError;
