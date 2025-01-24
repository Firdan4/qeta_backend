import { Response } from "express";
import { TRequest } from "../types";
import User from "../db/models/user";
import createError from "http-errors";
import Post from "../db/models/post";
import CommentLike from "../db/models/comment-likes";
import Comment from "../db/models/comment";
import { commentLikeById } from "../services/commentServices";

export const getCommentLikeById = async (req: TRequest, res: Response) => {
  const { commentId } = req.params;
  const userId = req.id;

  try {
    const likes = await commentLikeById(commentId);

    const isLike = likes.some((item) => item.userId === userId);
    const data = {
      isLike,
      likes,
      likeCount: likes.length,
    };

    return res.status(200).send({
      message: "Get Like Succesfully",
      data,
    });
  } catch (error: any) {
    return res.status(error.status || 500).send({
      message: error.message || "Internal Error!",
    });
  }
};

export const addCommentLike = async (req: TRequest, res: Response) => {
  try {
    const { commentId } = req.body;
    const userId = req.id as number;

    if (!commentId || !userId) {
      throw createError(400, "Missing required fields");
    }

    if (typeof commentId !== "string") {
      throw createError(400, "Invalid data type");
    }

    const [user, comment] = await Promise.all([
      User.findByPk(userId),
      Comment.findByPk(commentId),
    ]);

    if (!user) {
      throw createError(400, "User not found");
    }

    if (!comment) {
      throw createError(400, "Post not found");
    }

    const [data, created] = await CommentLike.findOrCreate({
      where: { commentId, userId },
      paranoid: false, // Sertakan data yang dihapus untuk diperiksa
    });

    if (!created && data.deletedAt) {
      // Jika entri sudah ada namun soft deleted, pulihkan
      await data.restore();
    }

    return res.status(200).send({
      message: "like has been added!",
      data,
    });
  } catch (error: any) {
    return res.status(error.status || 500).send({
      message: error.message || "Internal Error!",
    });
  }
};

export const removeCommentLike = async (req: TRequest, res: Response) => {
  try {
    const { commentId } = req.params;
    const userId = req.id;

    if (!req.id || !commentId) {
      throw createError(400, "Missing required fields");
    }

    await CommentLike.destroy({
      where: { commentId, userId },
    });

    return res.status(200).send({
      message: "like has been removed!",
      data: {
        commentId,
      },
    });
  } catch (error: any) {
    return res.status(error.status || 500).send({
      message: error.message || "Internal Error!",
    });
  }
};
