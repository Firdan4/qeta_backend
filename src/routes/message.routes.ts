import { Router } from "express";
import { verificationAccess } from "../middleware/auth";
import { getMessageById } from "../controllers/message.controllers";

const router = Router();

router.get("/:conversationId", verificationAccess, getMessageById);
// router.post("/", verificationAccess, sendMessage);
// router.delete("/:id", verificationAccess, removeComment);

export default router;
