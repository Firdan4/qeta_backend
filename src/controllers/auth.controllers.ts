import { Request, Response } from "express";
import createError from "http-errors";
import User from "../db/models/user";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "../services/userServices";
import {
  comparePassword,
  generateAccessAndRefreshToken,
  hashPasswords,
} from "../libs/auth";
import { sendEmail } from "../services/mailer";
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

    const result = await sendEmail({
      to: email,
      subject: "Testing send email",
      text: "Ini testing send email",
    });

    // const {
    //   id,
    //   password: userPassword,
    //   refreshToken: userRefreshToken,
    //   ...data
    // } = user.dataValues;

    // const { accessToken, refreshToken } = generateAccessAndRefreshToken({
    //   email: user.email,
    //   firstName: user.firstName,
    //   lastName: user.lastName,
    // });

    // await User.update({ refreshToken }, { where: { id } });

    // // Set cookie untuk refresh token
    // res.cookie("refreshToken", refreshToken, {
    //   httpOnly: true,
    //   maxAge: 7 * 24 * 60 * 60 * 1000,
    // });

    return res.status(200).send({
      message: "Send email verification successfully!",
      data: result,
      // token: accessToken,
      // user: data,
    });
  } catch (error: any) {
    return res.status(error.status || 500).send({
      message: error.message || "Internal Error!",
    });
  }
};
