import createError from "http-errors";
import { Response } from "express";
import { TRequest } from "../types";
import Comment from "../db/models/comment";
import User from "../db/models/user";
import Post from "../db/models/post";
import {
  getComment,
  getCommentCount,
  getReplyCount,
} from "../services/commentServices";

export const getComments = async (req: TRequest, res: Response) => {
  const { postId } = req.params;
  const { _limit, _page } = req.query;

  const limit = Number(_limit as string);
  const page = Number(_page as string);
  const offset = (page - 1) * limit;

  // console.log("page", page);

  try {
    const [comments, commentCount] = await Promise.all([
      getComment(postId, limit, offset),
      getCommentCount(postId),
    ]);

    const totalPages = Math.ceil(commentCount / limit);

    const data = {
      comments,
      commentCount,
      totalPages,
      currentPage: page,
    };

    return res.status(200).send({
      status: "success",
      message: "Get Comments Successfully",
      data,
    });
  } catch (error: any) {
    return res.status(error.status || 500).send({
      status: "failed",
      message: error.message || "Internal Error!",
    });
  }
};

export const fetchReplyCount = async (req: TRequest, res: Response) => {
  const { parentId } = req.params;

  try {
    const replyCount = await getReplyCount(parentId);

    const data = {
      replyCount,
    };

    return res.status(200).send({
      status: "success",
      message: "Get Reply Count Successfully",
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
    const { id } = req.params;
    const userId = req.id;

    if (!id || !userId) {
      throw createError(400, "Missing required fields");
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
