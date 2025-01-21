import createError from "http-errors";
import { Response } from "express";
import { TRequest } from "../types";
import Reply from "../db/models/reply";
import User from "../db/models/user";
import Comment from "../db/models/comment";

export const getReplies = async (req: TRequest, res: Response) => {
  const { commentId } = req.params;

  try {
    const replies = await Reply.findAll({
      where: { commentId },
      limit: 5,
      include: [
        {
          model: User,
          as: "users",
          attributes: ["id", "displayName", "verifiedAccount"],
        },
      ],
    });

    const data = {
      replies,
      replyCount: replies.length,
    };

    return res.status(200).send({
      status: "success",
      message: "Get Follow Succesfully",
      data,
    });
  } catch (error: any) {
    return res.status(error.status || 500).send({
      message: error.message || "Internal Error!",
    });
  }
};

export const addReply = async (req: TRequest, res: Response) => {
  try {
    const data = req.body;
    const { commentId } = data;
    const userId = req.id;

    if (!commentId || !userId) {
      throw createError(400, "Missing required fields");
    }

    const [user, comment] = await Promise.all([
      User.findByPk(userId),
      Comment.findByPk(commentId),
    ]);

    if (!user) {
      throw createError(400, "User not found");
    }

    if (!comment) {
      throw createError(400, "Comment not found");
    }

    const replyFields = {
      ...data,
      userId,
      pinned: false,
    };

    console.log(replyFields);

    const reply = await Reply.create(replyFields);

    return res.status(200).send({
      status: "success",
      message: "Reply comment added!",
      data: reply,
    });
  } catch (error: any) {
    return res.status(error.status || 500).send({
      status: "failed",
      message: error.message || "Internal Error!",
    });
  }
};

export const removeReply = async (req: TRequest, res: Response) => {
  try {
    const id = Number(req.params.id);
    const userId = req.id;

    if (!id || !userId) {
      throw createError(400, "Missing required fields");
    }

    if (typeof id !== "number") {
      throw createError(400, "Invalid data type");
    }

    await Reply.destroy({
      where: { id },
      force: true, // hapus jika menerapkan soft deleted
    });

    return res.status(200).send({
      status: "success",
      message: "Reply comment removed!",
    });
  } catch (error: any) {
    return res.status(error.status || 500).send({
      status: "failed",
      message: error.message || "Internal Error!",
    });
  }
};
