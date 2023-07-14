import { Request, Response, NextFunction } from "express";

import { AuthUser } from "../../auth/auth.types";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  updateProject,
} from "./projects.services";

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
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { user: userId } = req;
    const { title, description, images, links } = req.body;
    const project = await createProject({
      title,
      description,
      userId,
      images,
      links,
    });
    res.status(201).json({ message: "Project created!", data: project });
  } catch (error) {
    next(error);
  }
};

export const getProjectByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const project = await getProjectById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project found!", data: project });
  } catch (error) {
    next(error);
  }
};

export const updateProjectController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const project = await updateProject(id, req.body);
    res.status(200).json({ message: "Project updated!", data: project });
  } catch (error) {
    next(error);
  }
};

export const deleteProjectController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const project = await deleteProject(id);
    res.status(200).json({ message: "Project deleted succesfully", data: project });
  } catch (error) {
    next(error);
  }
};
