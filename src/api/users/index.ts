import { Router } from "express";
import { getAllUsersController, getUserByTokenController, updateUserController } from "./user.controller";
import { auth } from "../../middleware/auth";

const router = Router();

router.get("/", getAllUsersController);
router.get("/profile", auth, getUserByTokenController )
router.put("/", auth, updateUserController);
export default router;
