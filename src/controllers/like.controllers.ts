import { Response } from "express";
import { TRequest } from "../types";
import User from "../db/models/user";
import createError from "http-errors";
import Post from "../db/models/post";
import Like from "../db/models/like";

export const getLikeById = async (req: TRequest, res: Response) => {
  const { postId } = req.params;
  const userId = req.id;

  try {
    const likes = await Like.findAll({
      where: { postId, likeType: "post" },
    });

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

export const addLike = async (req: TRequest, res: Response) => {
  try {
    const { postId } = req.body;
    const userId = req.id;

    if (!postId || !userId) {
      throw createError(400, "Missing required fields");
    }

    if (typeof postId !== "number") {
      throw createError(400, "Invalid data type");
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

    const [data, created] = await Like.findOrCreate({
      where: { postId, userId, likeType: "post" },
      paranoid: false, // Sertakan data yang dihapus untuk diperiksa
    });

    if (!created && data.deletedAt) {
      // Jika entri sudah ada namun soft deleted, pulihkan
      await data.restore();
      console.log("Post liked again!");
    }

    return res.status(200).send({
      message: "Data berhasil ditambahkan!",
      data,
    });
  } catch (error: any) {
    return res.status(error.status || 500).send({
      message: error.message || "Internal Error!",
    });
  }
};

export const removeLike = async (req: TRequest, res: Response) => {
  try {
    const postId = Number(req.params.postId);
    const userId = req.id;

    if (!req.id || !postId) {
      throw createError(400, "Missing required fields");
    }

    if (typeof postId !== "number") {
      throw createError(400, "Invalid data type");
    }

    await Like.destroy({
      where: { postId, userId, likeType: "post" },
    });

    return res.status(200).send({
      message: "Data berhasil hapus!",
      data: {
        postId,
      },
    });
  } catch (error: any) {
    return res.status(error.status || 500).send({
      message: error.message || "Internal Error!",
    });
  }
};
