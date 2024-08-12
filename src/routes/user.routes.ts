import { Router } from "express";
import { getOne, getAll, updateUser } from "../controllers/user.controllers";
import { verificationAccess } from "../middleware/auth";
import { validationUpdateUser } from "../middleware/validation";
import upload from "../config/multer";

const router = Router();

router.get("/one", verificationAccess, getOne);
router.get("/all", verificationAccess, getAll);
router.post(
  "/updateUser",
  verificationAccess,
  upload.single("profile"),
  validationUpdateUser,
  updateUser
);

export default router;
