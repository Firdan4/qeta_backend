import createError from "http-errors";
import { NextFunction, Response } from "express";
import { verificationAccessToken } from "../libs/auth";
import jwt from "jsonwebtoken";
import { TRequest } from "../types";

export const verificationAccess = async (
  req: TRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw createError(403, "Invalid Access");
    }

    verificationAccessToken(token, async (err, decode) => {
      if (err) {
        return res.status(403).send({
          message: "Token expired!",
        });
      }

      const { email, id, firstName, lastName } = decode as jwt.JwtPayload;

      req.email = email;
      req.id = id;

      next();
    });
  } catch (error: any) {
    return res.status(error.status || 500).send({
      message: error.message || "Internal Error!",
    });
  }
};
