import { User, IUser } from "../../models/user.model";
import { UserDTO } from "../domain/user.dto";

export const createUser = async (userDto: UserDTO): Promise<IUser> => {
  const newUser: IUser = new User(userDto);
  return await newUser.save();
};

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  return await User.findOne({ email });
};
