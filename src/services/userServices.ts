import { Op } from "sequelize";
import User from "../db/models/user";
import Post from "../db/models/post";

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const user = await User.findOne({
    // attributes: {
    //   exclude: ["password"],
    // },
    where: {
      email,
    },
    include: [{ model: Post, as: "posts" }],
  });
  return user;
};

export const getAllUser = async (email: string) => {
  const user = await User.findAll({
    where: {
      email: {
        [Op.not]: email, // Gunakan Op.not untuk mengecualikan email tertentu
      },
    },
    attributes: {
      exclude: ["password", "refreshToken", "id", "tokenVerificationEmail"], // Exclude password jika diinginkan
    },
  });
  return user;
};
