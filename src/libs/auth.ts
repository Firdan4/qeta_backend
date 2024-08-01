import bcrypt from "bcryptjs";

export const hashPasswords = async (password: string): Promise<string> => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
};
export const comparePassword = async (
  password: string,
  userPassword: string
): Promise<boolean> => {
  const isMatch = bcrypt.compareSync(password, userPassword);

  return isMatch;
};
