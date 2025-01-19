import { Router } from "express";
import { verificationAccess } from "../middleware/auth";
import { follow, getFollow, unFollow } from "../controllers/follow.controllers";

const router = Router();

router.get("/:followingId", verificationAccess, getFollow);
router.post("/", verificationAccess, follow);
router.delete("/:followingId", verificationAccess, unFollow);

export default router;
