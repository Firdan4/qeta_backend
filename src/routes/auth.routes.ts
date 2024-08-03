import { Router } from "express";
import {
  signUp,
  getAllUser,
  signIn,
  emailVerification,
} from "../controllers/auth.controllers";
import {
  validationLogin,
  validationRegistration,
} from "../middleware/validation";

const router = Router();

router.post("/register", validationRegistration, signUp);
router.post("/login", validationLogin, signIn);
router.get("/emailVerification", emailVerification);

export default router;
