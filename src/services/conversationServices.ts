import { Op } from "sequelize";
import User from "../db/models/user";
import Conversation from "../db/models/conversation";

export const getListConversation = async (
  senderId?: string,
  limit?: number,
  offset?: number
): Promise<Conversation[] | null> => {
  const data = await Conversation.findAll({
    order: [["createdAt", "DESC"]],
    limit,
    offset,
    where: {
      [Op.or]: [
        { senderId }, // Pesan dari senderId ke receiverId
        { receiverId: senderId }, // Pesan dari receiverId ke senderId
      ],
    },
    include: [
      {
        model: User,
        as: "user",
        attributes: [
          "id",
          "firstName",
          "lastName",
          "displayName",
          "photoURL",
          "verifiedAccount",
        ],
      },
    ],
  });

  return data;
};

export const getConversationCount = async (
  senderId?: string
): Promise<number> => {
  const data = await Conversation.count({
    where: {
      [Op.or]: [
        { senderId }, // Pesan dari senderId ke receiverId
        { receiverId: senderId }, // Pesan dari receiverId ke senderId
      ],
    },
  });

  return data;
};
