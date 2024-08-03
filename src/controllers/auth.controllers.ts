import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import User from "../db/models/user";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "../services/userServices";
import {
  generateTokenVerificationCode,
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

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if (!user || !(await comparePassword(password, user.password))) {
      throw createError(401, "Invalid email or password.");
    }

    next();
  } catch (error: any) {
    return res.status(error.status || 500).send({
      message: error.message || "Internal Error!",
    });
  }
};

export const emailVerification = async (req: Request, res: Response) => {
  const { code, email } = req.body;

  try {
    if (!code) {
      throw createError(401, "Code verification is required!");
    }

    if (!email) {
      throw createError(401, "Email is required!");
    }
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw createError(401, "User not found!");
    }

    if (!user.tokenVerificationEmail) {
      throw createError(
        404,
        "User token verification email not found, please log in again or contact to admin"
      );
    }

    if (user.verifiedAccount) {
      throw createError(404, "User already verification!");
    }

    verificationEmail(user.tokenVerificationEmail, async (err, decoded) => {
      if (err) {
        return res.status(403).send({
          message: "Code verification expired!",
        });
      }

      const { email, code: codeToken } = decoded as jwt.JwtPayload &
        ManageTokenType;

      if (code !== codeToken || email !== user.email) {
        return res.status(403).send({
          message: "Verification code is invalid!",
        });
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

      await User.update(
        { refreshToken, verifiedAccount: true },
        { where: { email } }
      );

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

export const sendVerificationCode = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw createError(400, "Email is required!");
    }

    const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();

    const tokenVerificationEmail = generateTokenVerificationCode(
      email,
      verificationCode
    );

    await User.update({ tokenVerificationEmail }, { where: { email } });

    await sendEmail({
      to: email,
      subject: "Email Verification Code",
      text: "Verify your email",
      html: `
      <p>Enter <b>${verificationCode}</b> in the app to verify your email address. This code will expire in <b>3 minutes</b>.</p>
      <p>If you did not request this code, please ignore this email.</p>
    `,
    });

    return res.status(200).send({
      message: "Send code email verification successfully!",
    });
  } catch (error: any) {
    return res.status(error.status || 500).send({
      message: error.message || "Internal Error!",
    });
  }
};
