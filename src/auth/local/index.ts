import { Router } from "express";

import { loginController, signUpController } from "./local.controller";

const router = Router();

router.post("/signup", signUpController);
router.post("/login", loginController);

export default router;
