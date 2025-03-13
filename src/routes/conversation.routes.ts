import { Router } from "express";
import { verificationAccess } from "../middleware/auth";
import {
  createConversation,
  getConversations,
} from "../controllers/conversation.controllers";

const router = Router();

router.get("/", verificationAccess, getConversations);
router.post("/:receiverId", verificationAccess, createConversation);

export default router;
