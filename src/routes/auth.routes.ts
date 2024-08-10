import { Router } from "express";
import {
  signUp,
  signIn,
  emailVerification,
  sendVerificationCode,
  refreshToken,
} from "../controllers/auth.controllers";
import {
  validationLogin,
  validationRegistration,
} from "../middleware/validation";

const router = Router();

router.post("/register", validationRegistration, signUp);
router.post("/login", validationLogin, signIn, sendVerificationCode);
router.post("/sendVerificationCode", sendVerificationCode);
router.post("/emailVerification", emailVerification);
router.get("/refreshToken", refreshToken);

export default router;
