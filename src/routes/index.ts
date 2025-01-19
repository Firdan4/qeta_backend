import { Router } from "express";
import authRouter from "./auth.routes";
import userRouter from "./user.routes";
import postRouter from "./post.routes";
import likeRouter from "./like.routes";
import followRouter from "./follow.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/post", postRouter);
router.use("/like", likeRouter);
router.use("/follow", followRouter);

export default router;
