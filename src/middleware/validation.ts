import { Response, Request, NextFunction } from "express";
import { userRegisterSchema } from "../schemas/authSchemas";
import { ZodError } from "zod";

export const validationRegistration = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    userRegisterSchema.parse(req.body);
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
