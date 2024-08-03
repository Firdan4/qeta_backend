import { Request, Response } from "express";
import createError from "http-errors";
import User from "../db/models/user";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "../services/userServices";
import {
  accessTokenVerificationEmail,
  comparePassword,
  generateAccessAndRefreshToken,
  hashPasswords,
  ManageTokenType,
  verificationEmail,
} from "../libs/auth";
import { sendEmail } from "../services/mailer";
import jwt from "jsonwebtoken";

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

    const tokenVerificationEmail = accessTokenVerificationEmail(email);

    const result = await sendEmail({
      to: email,
      subject: "Testing send email",
      text: "Ini testing send email",
      html: `<a href='${process.env.BEST_API_URL}/auth/emailVerification?token=${tokenVerificationEmail}'>Verification Token</a>`,
    });

    return res.status(200).send({
      message: "Send email verification successfully!",
      // data: result,
      // token: accessToken,
      // user: data,
    });
  } catch (error: any) {
    return res.status(error.status || 500).send({
      message: error.message || "Internal Error!",
    });
  }
};

export const emailVerification = async (req: Request, res: Response) => {
  const { token } = req.query;

  if (typeof token !== "string") {
    return res.status(400).send({
      message: "Token is required!",
    });
  }

  try {
    verificationEmail(token, async (err, decoded) => {
      if (err) {
        throw createError(403, "Verification email invalid!");
      }

      if (!decoded) {
        throw createError(403, "Token verification invalid!");
      }

      const { email } = decoded as jwt.JwtPayload & ManageTokenType;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw createError(401, "Invalid email or password!");
      }

      const {
        id,
        password: userPassword,
        refreshToken: userRefreshToken,
        ...data
      } = user.dataValues;

      const { accessToken, refreshToken } = generateAccessAndRefreshToken({
        email,
        firstName: user.firstName,
        lastName: user.lastName,
      });

      await User.update({ refreshToken }, { where: { email } });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).send({
        message: "Email verified successfully!",
        token: accessToken,
        data,
      });
    });
  } catch (error: any) {
    return res.status(error.status || 500).send({
      message: error.message || "Internal Error!",
    });
  }
};
