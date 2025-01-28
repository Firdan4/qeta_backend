import createError from "http-errors";
import { Response } from "express";
import { TRequest } from "../types";
import User from "../db/models/user";
import Comment from "../db/models/comment";

export const getReplies = async (req: TRequest, res: Response) => {
  const { parentId } = req.params;
  const { _limit, _page } = req.query;

  const limit = Number(_limit as string);
  const page = Number(_page as string);
  const offset = (page - 1) * limit;

  try {
    const replies = await Comment.findAndCountAll({
      order: [["createdAt", "DESC"]],
      where: { parentId },
      limit,
      offset,
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "displayName", "photoURL", "verifiedAccount"],
        },
      ],
    });

    const totalPages = Math.ceil(replies.count / limit);

    const data = {
      replies: replies.rows,
      replyCount: replies.count,
      totalPages,
      currentPage: page,
    };

    return res.status(200).send({
      status: "success",
      message: "Get Replies Succesfully",
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
    const { parentId } = data;
    const userId = req.id;

    if (!parentId || !userId) {
      throw createError(400, "Missing required fields");
    }

    const [user, comment] = await Promise.all([
      User.findByPk(userId),
      Comment.findByPk(parentId),
    ]);

    if (!user) {
      throw createError(400, "User not found");
    }

    if (!comment) {
      throw createError(400, "Comment not found");
    }

    const replyFields = {
      ...data,
      parentId,
      userId,
      pinned: false,
    };

    // console.log(replyFields);

    await Comment.create(replyFields);

    return res.status(200).send({
      status: "success",
      message: "Reply comment added!",
      data: {
        parentId,
      },
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

    await Comment.destroy({
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
