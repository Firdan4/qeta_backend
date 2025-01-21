import { Router } from "express";
import {
  getOne,
  getAll,
  updateUser,
  getDisplayName,
} from "../controllers/user.controllers";
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
  // validationUpdateUser,
  updateUser
);
router.get("/:id", verificationAccess, getDisplayName);

export default router;
