import { Request, Response, NextFunction } from "express";
import { getAllUsers, updateUser } from "./user.services";
import { Prisma, PrismaClient } from "@prisma/client";
import { AuthUser } from "../../auth/auth.types";
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

export const updateUserController = async (
  req: AuthUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.user;
    const user = await updateUser(id, req.body);
    res.status(200).json({ message: "User updated", data: user });
  } catch (error) {
    next(error);
  }
};
