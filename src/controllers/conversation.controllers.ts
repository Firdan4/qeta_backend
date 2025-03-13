import { Response } from "express";
import { TRequest } from "../types";
import User from "../db/models/user";
import createError from "http-errors";
import {
  getConversationCount,
  getListConversation,
} from "../services/conversationServices";
import Conversation from "../db/models/conversation";
import { Op } from "sequelize";

export const getConversations = async (req: TRequest, res: Response) => {
  const senderId = req.id;
  const { _limit, _page } = req.query;

  const limit = Number(_limit as string);
  const page = Number(_page as string);
  const offset = (page - 1) * limit;

  try {
    if (!senderId) {
      throw createError(400, "Missing required fields");
    }

    const [conversations, conversationsCount] = await Promise.all([
      getListConversation(senderId, limit, offset),
      getConversationCount(senderId),
    ]);

    const totalPages = Math.ceil(conversationsCount / limit);

    const data = {
      senderId,
      conversations,
      conversationsCount,
      totalPages,
      currentPage: page,
    };
    return res.status(200).send({
      status: "success",
      message: "Get Conversations Succesfully",
      data,
    });
  } catch (error: any) {
    return res.status(error.status || 500).send({
      status: "failed",
      message: error.message || "Internal Error!",
    });
  }
};
export const createConversation = async (req: TRequest, res: Response) => {
  const { receiverId } = req.params;
  const body = req.body;
  const senderId = req.id;

  try {
    if (!receiverId || !senderId) {
      throw createError(400, "Missing required fields");
    }

    let conversation = await Conversation.findOne({
      where: {
        [Op.or]: [
          { receiverId }, // Pesan dari  receiverId ke senderId
          { senderId: receiverId }, // Pesan dari senderId ke  receiverId
        ],
      },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        ...body,
        senderId,
        receiverId,
      });
    }

    return res.status(200).send({
      status: "success",
      message: "Conversation Created!",
      data: conversation,
    });
  } catch (error: any) {
    return res.status(error.status || 500).send({
      status: "failed",
      message: error.message || "Internal Error!",
    });
  }
};
