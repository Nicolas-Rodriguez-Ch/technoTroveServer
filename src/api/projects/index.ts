import { Router } from "express";

import { auth } from "../../middleware/auth";
import {
  createProjectController,
  deleteProjectController,
  getAllProjectsController,
  getProjectByIdController,
  updateProjectController,
} from "./projects.controller";

const router = Router();

router.get("/", getAllProjectsController);
router.get("/:id", getProjectByIdController);
router.post("/", auth, createProjectController);
router.put("/:id", auth, updateProjectController);
router.patch("/:id", auth, deleteProjectController);

export default router;
