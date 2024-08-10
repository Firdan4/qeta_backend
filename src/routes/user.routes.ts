import { Router } from "express";
import { getOne, getAll } from "../controllers/user.controllers";
import { verificationAccess } from "../middleware/auth";

const router = Router();

router.get("/one", verificationAccess, getOne);
router.get("/all", verificationAccess, getAll);

export default router;
