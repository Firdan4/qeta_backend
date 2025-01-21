import createError from "http-errors";
import { Response } from "express";
import { TRequest } from "../types";
import Comment from "../db/models/comment";
import User from "../db/models/user";
import Post from "../db/models/post";

export const getComments = async (req: TRequest, res: Response) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.findAll({
      where: { postId },
      include: [
        {
          model: User,
          as: "users",
          attributes: ["id", "displayName", "verifiedAccount"],
        },
      ],
    });

    const data = {
      comments,
      commentCount: comments.length,
    };

    return res.status(200).send({
      status: "success",
      message: "Get Comments Succesfully",
      data,
    });
  } catch (error: any) {
    return res.status(error.status || 500).send({
      status: "failed",
      message: error.message || "Internal Error!",
    });
  }
};

export const addComment = async (req: TRequest, res: Response) => {
  try {
    const data = req.body;
    const { postId } = data;
    const userId = req.id;

    if (!postId || !userId) {
      throw createError(400, "Missing required fields");
    }

    const [user, post] = await Promise.all([
      User.findByPk(userId),
      Post.findByPk(postId),
    ]);

    if (!user) {
      throw createError(400, "User not found");
    }

    if (!post) {
      throw createError(400, "Post not found");
    }

    const commentFields = {
      ...data,
      userId,
      pinned: false,
    };

    const comment = await Comment.create(commentFields);

    return res.status(200).send({
      status: "success",
      message: "Comment added!",
      data: comment,
    });
  } catch (error: any) {
    return res.status(error.status || 500).send({
      status: "failed",
      message: error.message || "Internal Error!",
    });
  }
};

export const removeComment = async (req: TRequest, res: Response) => {
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
      message: "Comment removed!",
    });
  } catch (error: any) {
    return res.status(error.status || 500).send({
      status: "failed",
      message: error.message || "Internal Error!",
    });
  }
};
