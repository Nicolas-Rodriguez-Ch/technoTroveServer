import { Request, Response, NextFunction } from "express";
import { AuthUser } from "../../auth/auth.types";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  updateProject,
} from "./projects.services";
import checkProjectOwnerShip from "./projects.utils";
import convertFilesToImagesUrls from "../../utils/convertFilesToImageUrls";

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
    const userId = req.user;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { title, description, links, files } = req.body;

    let linksArray: string[] = [];
    if (typeof links === "string") {
      linksArray = links.split(",").map((link: string) => link.trim());
    }

    const images = convertFilesToImagesUrls(files);
    const project = await createProject({
      title,
      description,
      userId,
      images,
      links: linksArray,
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
  req: AuthUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { title, description, links, files } = req.body;
    const userId = req.user;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { status, message } = await checkProjectOwnerShip(userId, id);

    if (status !== 200) {
      return res.status(status).json({ message });
    }

    const images = convertFilesToImagesUrls(files);

    const project = await updateProject(id, {
      title,
      description,
      images,
      links,
      userId,
    });

    res.status(200).json({ message: "Project updated!", data: project });
  } catch (error) {
    next(error);
  }
};

export const deleteProjectController = async (
  req: AuthUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = req.user;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { status, message } = await checkProjectOwnerShip(userId, id);

    if (status !== 200) {
      return res.status(status).json({ message });
    }

    const project = await deleteProject(id);
    res
      .status(200)
      .json({ message: "Project deleted succesfully", data: project });
  } catch (error) {
    next(error);
  }
};
