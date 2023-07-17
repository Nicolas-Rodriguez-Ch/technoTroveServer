import { Router } from "express";
import {
  deleteUserController,
  getAllUsersController,
  getUserByTokenController,
  getUserProfileController,
  updateUserController,
} from "./user.controller";
import { auth } from "../../middleware/auth";
import processFileUploads from "../../middleware/uploads";

const router = Router();

router.get("/", getAllUsersController);
router.get("/profile", auth, getUserByTokenController);
router.get("/:id", getUserProfileController);
router.put("/", auth, processFileUploads, updateUserController);
router.delete("/deactivate", auth, deleteUserController);

export default router;
