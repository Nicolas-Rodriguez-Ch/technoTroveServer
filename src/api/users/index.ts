import { Router } from "express";
import { getAllUsersController, signUpController } from "./user.controller";

const router = Router();

router.get("/", getAllUsersController);
router.post("/signup", signUpController);

export default router;