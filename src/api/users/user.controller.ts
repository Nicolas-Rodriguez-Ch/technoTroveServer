import { Request, Response, NextFunction } from "express";
import { getAllUsers } from "./user.services";
import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// gets all the users from the db

export const getAllUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await getAllUsers();
    res
      .status(200)
      .send({ message: "Users retrieved successfully", data: users });
  } catch (error) {
    next(error);
  }
};
