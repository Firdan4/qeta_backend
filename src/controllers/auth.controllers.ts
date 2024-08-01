import { Request, Response } from "express";
import createError from "http-errors";
import User from "../db/models/user";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "../services/userServices";
import { comparePassword, hashPasswords } from "../libs/auth";
export const getAllUser = async (req: Request, res: Response) => {
  return res.status(200).send({
    message: "API Get ALL User",
  });
};

export const signUp = async (req: Request, res: Response) => {
  const { password, ...prev } = req.body;

  try {
    const existingUser = await getUserByEmail(prev.email);
    if (existingUser) {
      throw createError(409, { message: "Email already using!" });
    }

    const hashPassword = await hashPasswords(password);

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

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if (!user || !(await comparePassword(password, user.password))) {
      throw createError(401, "Invalid email or password.");
    }

    return res.status(200).send({
      message: "API login",
      user,
    });
  } catch (error: any) {
    return res.status(error.status || 500).send({
      message: error.message || "Internal Error!",
    });
  }
};
