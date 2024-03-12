import { IUser, User } from "../../models/user.model";

export default async function findUserByEmail({
  email,
}: {
  email: string;
}): Promise<IUser | null> {
  try {
    return await User.findOne({ email }).lean().exec();
  } catch (error) {
    throw new Error("Failed to find user by email address");
  }
}
