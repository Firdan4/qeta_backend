import { Router } from "express";
import { signUp, getAllUser, signIn } from "../controllers/auth.controllers";
import {
  validationLogin,
  validationRegistration,
} from "../middleware/validation";

const router = Router();

router.post("/register", validationRegistration, signUp);
router.post("/login", validationLogin, signIn);

export default router;
