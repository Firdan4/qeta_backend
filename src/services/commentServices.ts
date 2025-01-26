import { Op, Sequelize } from "sequelize";
import Post from "../db/models/post";
import Like from "../db/models/like";
import User from "../db/models/user";
import Comment from "../db/models/comment";

// export type CommentType = {
//   count?: number;
//   rows: Comment[];
// };

export const getComment = async (
  postId?: string
): Promise<Comment[] | null> => {
  const data = await Comment.findAll({
    order: [["createdAt", "DESC"]],
    where: { postId, parentId: null },
    include: [
      { model: Like, as: "like" },
      {
        model: User,
        as: "user",
        attributes: ["id", "displayName", "photoURL", "verifiedAccount"],
      },
    ],
  });

  return data;
};

export const getCommentCount = async (
  postId?: string
): Promise<number | null> => {
  const data = await Comment.count({
    where: {
      postId,
    },
  });

  return data;
};

export const commentLikeById = async (commentId?: string): Promise<Like[]> => {
  const data = await Like.findAll({
    where: { commentId, likeType: "comment" },
  });

  return data ?? [];
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
