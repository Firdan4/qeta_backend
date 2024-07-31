import { Router } from "express";
import { createUser, getAllUser } from "../controllers/user.controllers";

const router = Router();

router.get("/", getAllUser);
router.post("/", createUser);

export default router;
