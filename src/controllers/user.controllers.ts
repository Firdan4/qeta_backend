import { Request, Response } from "express";

export const getAllUser = async (req: Request, res: Response) => {
  return res.status(200).send({
    message: "API Get ALL User",
  });
};

export const createUser = async (req: Request, res: Response) => {
  return res.status(200).send({
    message: "API Create User",
  });
};
