import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import findUserByEmail from "../../../data-access/repository/user/get.repository";
import config from "../../../configs";
import { CustomError } from "../../../utils/customError";
export default async function userLogin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await findUserByEmail({ email });

  if (!user) {
    throw new CustomError(401,"USER_NOT_FOUND","No user found for this email address");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new CustomError(401,"INVALID_PASSWORD","Invalid password provided");
  }

  const token = jwt.sign({ userId: user._id }, config.JSON_WEB_TOKEN_SECRET);

  return token;
}
