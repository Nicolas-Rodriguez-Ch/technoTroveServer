import { Request, Response, NextFunction } from "express";

import { AuthUser } from "../../auth/auth.types";
import { createProject, getAllProjects } from "./projects.services";

export const getAllProjectsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const projects = await getAllProjects();
    res.status(200).json({ message: "Projects found", data: projects });
  } catch (error) {
    next(error);
  }
};

export const createProjectController = async (
  req: AuthUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user: userId } = req;
    const {title, description, images, links} = req.body
    const project = await createProject({ title, description, userId, images, links})
  } catch (error) {}
};
