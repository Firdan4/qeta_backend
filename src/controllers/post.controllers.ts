import { Response } from "express";
import createError from "http-errors";
import Post from "../db/models/post";
import { TRequest } from "../types";
import { getPostwithLike, getRandomPost } from "../services/postServices";

export const createPostVideo = async (req: TRequest, res: Response) => {
  const files = req.files as Express.Multer.File[];

  try {
    if (!files || files.length === 0) {
      throw createError(400, "File is required!");
    }

    const dataSource = files.find(
      (prev) => prev.originalname !== "thumbnail.jpeg"
    );
    const dataThumnail = files.find(
      (prev) => prev.originalname === "thumbnail.jpeg"
    );

    const postFields = {
      ...req.body,
      idUser: req.id,
      typePost: "video",
      source: `${dataSource?.destination}/${dataSource?.filename}`,
      thumbnail: `${dataThumnail?.destination}/${dataThumnail?.filename}`,
    };

    const post = await Post.create(postFields);

    return res.status(200).send({
      message: "Created Post Succesfully",
      post,
    });
  } catch (error: any) {
    return res.status(error.status || 500).send({
      message: error.message || "Internal Error!",
    });
  }
};

export const getAllPost = async (req: TRequest, res: Response) => {
  try {
    const data = await getRandomPost(req.id);

    return res.status(200).send({
      message: "Get Random Post Succesfully",
      data,
    });
  } catch (error: any) {
    return res.status(error.status || 500).send({
      message: error.message || "Internal Error!",
    });
  }
};

export const getPostByLike = async (req: TRequest, res: Response) => {
  try {
    const data = await getPostwithLike(req.id);

    return res.status(200).send({
      message: "Get Random Post Succesfully",
      data,
    });
  } catch (error: any) {
    return res.status(error.status || 500).send({
      message: error.message || "Internal Error!",
    });
  }
};

export const getPostById = async (req: TRequest, res: Response) => {
  try {
    const data = await Post.findAll({
      order: [["createdAt", "DESC"]],
      // limit: 10,
      where: {
        idUser: req.id,
      },
    });

    return res.status(200).send({
      message: "Get My Post Succesfully",
      data,
    });
  } catch (error: any) {
    return res.status(error.status || 500).send({
      message: error.message || "Internal Error!",
    });
  }
};
