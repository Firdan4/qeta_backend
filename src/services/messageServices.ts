import User from "../db/models/user";
import Message from "../db/models/message";

export const getMessage = async (
  conversationId?: string,
  limit?: number,
  offset?: number
): Promise<Message[] | null> => {
  const data = await Message.findAll({
    order: [["createdAt", "DESC"]],
    limit,
    offset,
    where: { conversationId },
    include: [
      {
        model: User,
        as: "user",
        attributes: [
          ["id", "_id"],
          "firstName",
          "lastName",
          ["displayName", "name"],
          ["photoURL", "avatar"],
          "verifiedAccount",
        ],
      },
    ],
  });

  return data;
};

export const getMessageCount = async (
  conversationId?: string
): Promise<number> => {
  const data = await Message.count({
    where: { conversationId },
  });

  return data;
};
