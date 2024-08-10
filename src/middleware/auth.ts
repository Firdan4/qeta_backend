import createError from "http-errors";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { verificasiAccessToken } from "../libs/auth";
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
      throw createError(403, "Token is required!");
    }

    verificasiAccessToken(token, async (err, decode) => {
      if (err) {
        return res.status(403).send({
          message: "Token expired!",
        });
      }

      const { email, firstName, lastName } = decode as jwt.JwtPayload;

      req.email = email;

      next();
    });
  } catch (error: any) {
    return res.status(error.status || 500).send({
      message: error.message || "Internal Error!",
    });
  }
};
