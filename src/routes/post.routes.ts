import { Router } from "express";
import { createPostVideo } from "../controllers/post.controllers";
import upload from "../config/multer";
import { verificationAccess } from "../middleware/auth";

const router = Router();

router.post(
  "/video",
  upload.single("postVideo"),
  verificationAccess,
  createPostVideo
);

export default router;
