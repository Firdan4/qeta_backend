import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Response } from "express";
import createError from "http-errors";
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

export const generateAccessAndRefreshToken = (data: ManageTokenType) => {
  const refreshToken = refreshTokens(data);
  const accessToken = accessTokens(data);

  return { accessToken, refreshToken };
};

export const accessTokenVerificationEmail = (email: string) => {
  const accessToken = jwt.sign(
    { email },
    process.env.ACCESS_TOKEN_VERIFICATION_EMAIL_KEY!,
    {
      expiresIn: "1d",
    }
  );
  return accessToken;
};

export const verificationEmail = (
  token: string,
  callback: jwt.VerifyCallback
) => {
  jwt.verify(token, process.env.ACCESS_TOKEN_VERIFICATION_EMAIL_KEY!, callback);
};
