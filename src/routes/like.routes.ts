import { Router } from "express";
import { verificationAccess } from "../middleware/auth";
import {
  addLike,
  getLikeById,
  removeLike,
} from "../controllers/like.controllers";

const router = Router();

router.get("/:postId", verificationAccess, getLikeById);
router.post("/", verificationAccess, addLike);
router.delete("/:postId", verificationAccess, removeLike);

export default router;
