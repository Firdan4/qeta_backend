import { Router } from "express";
import { getOne, getAll } from "../controllers/user.controllers";

const router = Router();

router.get("byEmail/:email", getOne);
router.get("all/:email", getAll);

export default router;
