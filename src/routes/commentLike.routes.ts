import { Router } from "express";
import { verificationAccess } from "../middleware/auth";
import {
  addCommentLike,
  getCommentLikeById,
  removeCommentLike,
} from "../controllers/commentLike.controllers";

const router = Router();

router.get("/:commentId", verificationAccess, getCommentLikeById);
router.post("/", verificationAccess, addCommentLike);
router.delete("/:commentId", verificationAccess, removeCommentLike);

export default router;
