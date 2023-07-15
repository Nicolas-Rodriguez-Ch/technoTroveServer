import { Request, Response, NextFunction } from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  getUserProfile,
  updateUser,
} from "./user.services";
import { AuthUser } from "../../auth/auth.types";

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
    const profilePicture = req.body.files[0]?.url || null;
    const user = await updateUser(id, { ...req.body, profilePicture });
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

export const getUserProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await getUserProfile(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .send({ message: "User retrieved successfully", data: user });
  } catch (error) {
    next(error);
  }
};
