import { Router } from "express";
import authRouter from "./auth.routes";
import userRouter from "./user.routes";
import postRouter from "./post.routes";
import likeRouter from "./like.routes";
import followRouter from "./follow.routes";
import commentRouter from "./comment.routes";
import commentLikeRouter from "./commentLike.routes";
import replyRouter from "./reply.routes";
import conversationRouter from "./conversation.routes";
import messageRouter from "./message.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/post", postRouter);
router.use("/like", likeRouter);
router.use("/follow", followRouter);
router.use("/comment", commentRouter);
router.use("/comment-like", commentLikeRouter);
router.use("/reply", replyRouter);
router.use("/conversation", conversationRouter);
router.use("/message", messageRouter);

export default router;
