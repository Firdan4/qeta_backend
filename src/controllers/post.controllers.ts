import { Response } from "express";
import createError from "http-errors";
import Post from "../db/models/post";
import { TRequest } from "../types";

export const createPostVideo = async (req: TRequest, res: Response) => {
  try {
    if (!req.file) {
      throw createError(400, "File is required!");
    }

    const postFields = {
      ...req.body,
      idUser: req.id,
      typePost: "video",
      source: `${req.file?.destination}/${req.file?.filename}`,
    };

    const post = await Post.create(postFields);

    return res.status(200).send({
      message: "API create Post",
      post,
    });
  } catch (error: any) {
    return res.status(error.status || 500).send({
      message: error.message || "Internal Error!",
    });
  }
};
