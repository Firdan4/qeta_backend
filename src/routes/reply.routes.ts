import { Router } from "express";
import { verificationAccess } from "../middleware/auth";
import {
  addReply,
  getReplies,
  removeReply,
} from "../controllers/reply.controllers";

const router = Router();

router.get("/:commentId", verificationAccess, getReplies);
router.post("/", verificationAccess, addReply);
router.delete("/:id", verificationAccess, removeReply);

export default router;
