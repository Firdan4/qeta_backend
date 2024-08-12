import { Request, Response, NextFunction } from "express";
import User from "../db/models/user";
import createError from "http-errors";
import { getAllUser, getUserByEmail } from "../services/userServices";
import validateEmail from "../libs/validationEmail";
import { TRequest } from "../types";

export const getOne = async (req: TRequest, res: Response) => {
  const email = req.email;

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
      tokenVerificationEmail: _tokenVerificationEmail,
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

export const getAll = async (req: TRequest, res: Response) => {
  const email = req.email;

  try {
    if (!email) {
      throw createError(404, "Email is required!");
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

export const updateUser = async (req: TRequest, res: Response) => {
  try {
    const email = req.email;

    if (!email || !validateEmail(email)) {
      throw createError(400, "Invalid or missing email parameter!");
    }

    const updateFields = req.body;
    if (Object.keys(updateFields).length === 0) {
      throw createError(400, "No fields to update!");
    }

    const [updated] = await User.update(
      {
        ...updateFields,
        photoURL: `${req.file?.destination}/${req.file?.filename}`,
      },
      {
        where: { email },
      }
    );

    if (updated === 0) {
      throw createError(404, "User not found or no changes made!");
    }

    const user = await getUserByEmail(email);

    if (!user) {
      throw createError(404, "User not found!");
    }

    const {
      id,
      password: userPassword,
      refreshToken: userRefreshToken,
      tokenVerificationEmail: usertokenVerificationEmail,
      ...datas
    } = user.dataValues;

    return res.status(200).send({
      message: "Update data successfully!",
      data: datas,
    });
  } catch (error: any) {
    return res.status(error.status || 500).send({
      message: error.message || "Internal Error!",
    });
  }
};
