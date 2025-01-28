import { Router } from "express";
import { verificationAccess } from "../middleware/auth";
import {
  addComment,
  fetchReplyCount,
  getComments,
  removeComment,
} from "../controllers/comment.controllers";

const router = Router();

router.get("/:postId", verificationAccess, getComments);
router.get("/replyCount/:parentId", verificationAccess, fetchReplyCount);
router.post("/", verificationAccess, addComment);
router.delete("/:id", verificationAccess, removeComment);

export default router;
