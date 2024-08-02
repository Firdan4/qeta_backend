import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

interface ManageTokenType {
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
