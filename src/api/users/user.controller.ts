import { Request, Response, NextFunction } from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "./user.services";
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

export const getUserByTokenController = async (
  req: AuthUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req;
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    const fetchedUser = await getUserById(user as string);
    if (!fetchedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User found!", data: fetchedUser });
  } catch (error) {
    next(error);
  }
};

export const deleteUserController = async (
  req: AuthUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user: id } = req;
    if (!id) {
      return res.status(404).json({ message: "User not Found" });
    }
    const user = await deleteUser(id);
    res.status(202).json({ message: "User deleted successfully", data: user });
  } catch (error) {
    next(error);
  }
};
