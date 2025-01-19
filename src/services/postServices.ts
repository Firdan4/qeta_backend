import { Op, Sequelize } from "sequelize";
import Post from "../db/models/post";
import Like from "../db/models/like";

export const getRandomPost = async (
  userId?: number
): Promise<Post[] | null> => {
  const post = await Post.findAll({
    order: [Sequelize.fn("RAND")],
    limit: 10,
    where: {
      idUser: {
        [Op.ne]: userId, // Kondisi: idUser tidak sama dengan user saat ini
      },
    },
    include: [{ model: Like, as: "like" }],
    // group: ["idUser"], // Disabled Sementara
  });

  return post;
};

export const getPostwithLike = async (
  userId?: number
): Promise<Post[] | null> => {
  const post = await Post.findAll({
    order: [Sequelize.fn("RAND")],
    limit: 10,
    where: {
      idUser: {
        [Op.ne]: userId, // Kondisi: idUser tidak sama dengan user saat ini
      },
    },
    include: [{ model: Like, as: "like", where: { userId: userId } }],
    // group: ["idUser"], // Disabled Sementara
  });

  return post;
};
