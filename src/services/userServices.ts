import User from "../db/models/user";

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const user = await User.findOne({
    // attributes: {
    //   exclude: ["password"],
    // },
    where: {
      email,
    },
  });
  return user;
};
