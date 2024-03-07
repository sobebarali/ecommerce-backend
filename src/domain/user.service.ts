import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../data-access/user.repository";
import { IUser, User } from "../data-access/user.model";
import { HttpError } from "../utils/httpError";


export const userRegister = async (user: IUser) => {
  const { username, email, password, fullName, address, phone } = user;

  // Check if user already exists
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new HttpError(409, "User with this email already exists");
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  
  // Create a new user using the User model
  const newUser: IUser = new User({
    username,
    email,
    password: hashedPassword,
    fullName,
    address,
    phone,
  });

  await createUser(newUser);
};

export const userLogin = async (credentials: {
  email: string;
  password: string;
}) => {
  const { email, password } = credentials;

  // Find the user by email
  const user = await findUserByEmail(email);

  // If user not found, return error
  if (!user) {
    throw new HttpError(401, "Invalid email or password");
  }

  // Verify the password
  const isValidPassword = await bcrypt.compare(password, user.password);

  // If password is invalid, return error
  if (!isValidPassword) {
    throw new HttpError(401, "Invalid email or password");
  }

  // Generate a JSON Web Token
  const token = jwt.sign({ userId: user._id }, "your_secret_key");

  return token;
};
