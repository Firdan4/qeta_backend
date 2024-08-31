import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Response } from "express";
import createError from "http-errors";
import User, { UserAttributes } from "../db/models/user";
dotenv.config();

export interface ManageTokenType {
  email: string;
  firstName: string;
  lastName: string;
}

export const hashPasswords = async (password: string): Promise<string> => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
};

export const comparePassword = async (
  password: string,
  userPassword: string
): Promise<boolean> => {
  const isMatch = bcrypt.compareSync(password, userPassword);

  return isMatch;
};

export const accessTokens = (data: ManageTokenType) => {
  const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_KEY!, {
    expiresIn: "1d",
  });
  return accessToken;
};

export const refreshTokens = (data: ManageTokenType) => {
  const refreshToken = jwt.sign(data, process.env.ACCESS_TOKEN_KEY!, {
    expiresIn: "30d",
  });
  return refreshToken;
};

export const generateAccessAndRefreshToken = async (
  user: UserAttributes,
  res: Response
) => {
  const data = {
    id: user.id,
    email: user.email!,
    firstName: user.firstName!,
    lastName: user.lastName!,
  };

  const refreshToken = refreshTokens(data);
  const accessToken = accessTokens(data);

  const {
    id,
    password: userPassword,
    refreshToken: userRefreshToken,
    tokenVerificationEmail: usertokenVerificationEmail,
    ...datas
  } = user;

  await User.update(
    { refreshToken, verifiedAccount: true },
    { where: { email: user.email } }
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return { token: accessToken, data: datas };
};

export const generateTokenVerificationCode = (email: string, code: string) => {
  const accessToken = jwt.sign(
    { email, code },
    process.env.ACCESS_TOKEN_VERIFICATION_CODE_KEY!,
    {
      expiresIn: "3m",
    }
  );
  return accessToken;
};

export const verificationEmail = (
  token: string,
  callback: jwt.VerifyCallback
) => {
  jwt.verify(token, process.env.ACCESS_TOKEN_VERIFICATION_CODE_KEY!, callback);
};

export const verificationAccessToken = (
  token: string,
  callback: jwt.VerifyCallback
) => {
  jwt.verify(token, process.env.ACCESS_TOKEN_KEY!, callback);
};

export const verificationRefreshToken = (
  token: string,
  callback: jwt.VerifyCallback
) => {
  jwt.verify(token, process.env.ACCESS_TOKEN_KEY!, callback);
};
