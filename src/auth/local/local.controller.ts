import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { createUser } from "../../api/users/user.services";
import { login, signToken } from "../auth.services";

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
    const password = await bcrypt.hash(passToEncrypt, 10);

    const profilePicture = req.body.files[0]?.url || null;

    const { id } = await createUser({
      ...req.body,
      password,
      profilePicture
    });
    const token = signToken({ id });

    res.status(201).send({
      message: "User created successfully",
      data: { fullName, email },
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await login(email);

    if (!user) {
      throw new Error("Email or password are incorrect");
    }
    const isValid: boolean = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new Error("Email or Password are incorrect");
    }

    const { fullName, id } = user;
    const token = signToken({ id });

    res.setHeader("Authorization", `Bearer ${token}`);
    res.status(201).send({
      message: "User logged in successfully",
      data: { email, fullName },
      token,
    });
  } catch (error) {
    next(error);
  }
};
