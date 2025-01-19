import { Router } from "express";
import {
  createPostVideo,
  getAllPost,
  getPostById,
  getPostByLike,
} from "../controllers/post.controllers";
import upload from "../config/multer";
import { verificationAccess } from "../middleware/auth";

const router = Router();

router.post(
  "/video",
  upload.array("postVideo"),
  verificationAccess,
  createPostVideo
);
router.get("/all-post", verificationAccess, getAllPost);
router.get("/post-by-like", verificationAccess, getPostByLike);
router.get("/my-post", verificationAccess, getPostById);

export default router;
