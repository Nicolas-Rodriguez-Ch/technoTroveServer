import { Router } from "express";

import { auth } from "../../middleware/auth";
import { getAllProjectsController } from "./projects.controller";

const router = Router();

router.get("/", getAllProjectsController);

export default router;
