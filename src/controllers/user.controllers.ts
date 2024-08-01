import { Request, Response } from "express";
import createError from "http-errors";
import User from "../db/models/user";
import bcrypt from "bcryptjs";
export const getAllUser = async (req: Request, res: Response) => {
  return res.status(200).send({
    message: "API Get ALL User",
  });
};

export const signUp = async (req: Request, res: Response) => {
  const { password, ...prev } = req.body;

  try {
    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });
    if (existingUser) {
      throw createError(409, { message: "Email already using!" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({
      ...prev,
      password: hashPassword,
    });

    res.status(200).send({
      message: "Registration successfully!",
    });
  } catch (error: any) {
    res.status(error.status || 500).send({
      message: error.message || "Internal Error!",
    });
  }
};
