import { Response } from "express";
import { TRequest } from "../types";
import createError from "http-errors";
import Conversation from "../db/models/conversation";
import { Op } from "sequelize";
import { getMessage, getMessageCount } from "../services/messageServices";

export const getMessageById = async (req: TRequest, res: Response) => {
  const { conversationId } = req.params;
  const senderId = req.id;
  const { _limit, _page } = req.query;

  const limit = Number(_limit as string);
  const page = Number(_page as string);
  const offset = (page - 1) * limit;

  try {
    if (!conversationId) {
      throw createError(400, "Missing required fields");
    }

    const [messages, messageCount] = await Promise.all([
      getMessage(conversationId, limit, offset),
      getMessageCount(conversationId),
    ]);

    const totalPages = Math.ceil(messageCount / limit);

    const data = {
      messages,
      messageCount,
      senderId,
      totalPages,
      currentPage: page,
    };
    return res.status(200).send({
      status: "success",
      message: "Get Messages Succesfully",
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
