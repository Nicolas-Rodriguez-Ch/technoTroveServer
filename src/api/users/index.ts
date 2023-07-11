import { Router } from "express";
import { getAllUsersController } from "./user.controller";

const router = Router();

router.get("/", getAllUsersController);

export default router;