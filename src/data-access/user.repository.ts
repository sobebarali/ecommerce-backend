import { User, IUser } from "./user.model";

export const createUser = async (user: IUser): Promise<IUser> => {
  return await user.save();
};

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  return await User.findOne({ email });
};
