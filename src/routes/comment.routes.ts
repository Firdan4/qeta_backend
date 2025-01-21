import { Router } from "express";
import { verificationAccess } from "../middleware/auth";
import {
  addComment,
  getComments,
  removeComment,
} from "../controllers/comment.controllers";
import { getReplies } from "../controllers/reply.controllers";

const router = Router();

router.get("/:postId", verificationAccess, getComments);
router.post("/", verificationAccess, addComment);
router.delete("/:id", verificationAccess, removeComment);

export default router;
