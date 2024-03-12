import bcrypt from "bcrypt";
import createUser from "../../../data-access/repository/user/create.repository";
import findUserByEmail from "../../../data-access/repository/user/get.repository";
import { CustomError } from "../../../utils/customError";


export default async function userCreate({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  const existingUser = await findUserByEmail({ email });

  if (existingUser) {
    throw new CustomError(409, "USER_ALREADY_EXISTS", "User already exists with this email address");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);


  await createUser({
    name,
    email,
    password: hashedPassword,
  });
}
