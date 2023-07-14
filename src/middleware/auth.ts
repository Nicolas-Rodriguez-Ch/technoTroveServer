import { Request, Response, NextFunction } from "express";
import { verifyToken, DecodedToken } from "../auth/auth.services";
import { AuthUser } from "../auth/auth.types";

export const auth = (
  req: Request & AuthUser,
  res: Response,
  next: NextFunction
) => {  
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new Error("Your session has expires, please log in again");
    }
    const [_, token] = authorization.split(" ");
    if (!token) {
      throw new Error("your session has expired, please log in again");
    }
    const decodedToken = verifyToken(token);
    if (!decodedToken) {
      throw new Error("Invalid token, please log in again");
    }
    const { id } = verifyToken(token) as DecodedToken;
    req.user = id;
    next();
  } catch (error) {
    next(error);
  }
};
