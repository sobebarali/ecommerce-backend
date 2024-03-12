import { IUser, User } from "../../models/user.model";

export default async function createUser({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}): Promise<IUser> {
  const user = new User({
    name,
    email,
    password,
  });

 try {
   return await user.save();
 } catch (error) {
    throw new Error("Failed to create user");
 }
}