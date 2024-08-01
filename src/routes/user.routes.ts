import { Router } from "express";
import { signUp, getAllUser } from "../controllers/user.controllers";
import { validationRegistration } from "../middleware/validation";

const router = Router();

router.get("/", getAllUser);
router.post("/", validationRegistration, signUp);

export default router;
