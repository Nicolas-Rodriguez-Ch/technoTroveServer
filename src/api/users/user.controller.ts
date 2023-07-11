import { Request, Response, NextFunction } from "express";
import { getAllUsers, createUser } from "./user.services";
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

export const signUpController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, fullName } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(409).json({ message: "User with this email already exists" });
      return;
    }
    const { id } = await createUser({
      ...req.body,
    });

    res.status(201).send({
      message: "User created successfully",
      data: { fullName, email },
    });
  } catch (error) {
    next(error);
  }
};
