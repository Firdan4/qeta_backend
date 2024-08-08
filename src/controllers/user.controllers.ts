import { Request, Response, NextFunction } from "express";
import User from "../db/models/user";
import createError from "http-errors";
import { getAllUser, getUserByEmail } from "../services/userServices";
import validateEmail from "../libs/validationEmail";

export const getOne = async (req: Request, res: Response) => {
  const { email } = req.params;

  if (!email || !validateEmail(email)) {
    throw createError(400, "Invalid or missing email parameter!");
  }

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      throw createError(404, "User not found!");
    }

    const {
      id,
      password: _password,
      refreshToken: _refreshToken,
      ...userData
    } = user.dataValues;

    res.status(200).json({
      message: "User retrieved successfully!",
      data: userData,
    });
  } catch (error: any) {
    return res.status(error.status || 500).send({
      message: error.message || "Internal Error!",
    });
  }
};

export const getAll = async (req: Request, res: Response) => {
  const { email } = req.params;

  try {
    if (!email) {
      throw createError(404, "Params is required!");
    }

    const users = await getAllUser(email);

    return res.status(200).send({
      message: "Get user successfully!",
      data: users,
    });
  } catch (error: any) {
    return res.status(error.status || 500).send({
      message: error.message || "Internal Error!",
    });
  }
};
