import { Router } from "express";
import {
  deleteUserController,
  getAllUsersController,
  getUserByTokenController,
  updateUserController,
} from "./user.controller";
import { auth } from "../../middleware/auth";

const router = Router();

router.get("/", getAllUsersController);
router.get("/profile", auth, getUserByTokenController);
router.put("/", auth, updateUserController);
router.delete("/deactivate", auth, deleteUserController);


export default router;
