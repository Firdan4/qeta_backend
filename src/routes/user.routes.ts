import { Router } from "express";
import { getOne, getAll, updateUser } from "../controllers/user.controllers";
import { verificationAccess } from "../middleware/auth";
import { validationUpdateUser } from "../middleware/validation";

const router = Router();

router.get("/one", verificationAccess, getOne);
router.get("/all", verificationAccess, getAll);
router.get("/updateUser", verificationAccess, validationUpdateUser, updateUser);

export default router;
