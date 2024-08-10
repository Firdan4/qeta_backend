import { Response, Request, NextFunction } from "express";
import {
  registerSchema,
  loginSchema,
  updateUserSchema,
} from "../schemas/authSchemas";
import { ZodError } from "zod";

export const validationRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    registerSchema.parse(req.body);
    next();
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Validation error",
        errors: error.errors,
      });
    } else {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
};

export const validationLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    loginSchema.parse(req.body);
    next();
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).send({
        message: "Validation error",
        errors: error.errors,
      });
    } else {
      return res.status(error.status || 500).send({
        message: error.message || "Internal Error!",
      });
    }
  }
};

export const validationUpdateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    updateUserSchema.parse(req.body);
    next();
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Validation error",
        errors: error.errors,
      });
    } else {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
};
