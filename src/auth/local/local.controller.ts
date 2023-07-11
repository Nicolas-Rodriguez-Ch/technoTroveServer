import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { createUser } from "../../api/users/user.services";

const prisma = new PrismaClient();

export const signUpController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, fullName, password: passToEncrypt } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(409).json({ message: "User with this email already exists" });
      return;
    }
    const password = await bcrypt.hash(passToEncrypt, 10)

    const { id } = await createUser({
      ...req.body,
      password
    });

    res.status(201).send({
      message: "User created successfully",
      data: { fullName, email },
    });
  } catch (error) {
    next(error);
  }
};
