import { Router } from "express";
import { getAllUsersController, updateUserController } from "./user.controller";
import { auth } from "../../middleware/auth";

const router = Router();

router.get("/", getAllUsersController);
router.put("/", auth, updateUserController);
export default router;
