import User from "../db/models/user";

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const user = await User.findOne({
    where: {
      email,
    },
  });
  return user;
};
