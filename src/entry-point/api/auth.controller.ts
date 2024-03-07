import { Request, Response, NextFunction } from "express";
import { userLogin, userRegister } from "../../domain/user.service";
import { IUser } from "../../data-access/user.model";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password, fullName, address, phone } = req.body;

    const user: IUser = { 
      username,
      email,
      password,
      fullName,
      address,
      phone,
    } as IUser;

    await userRegister(user);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const token = await userLogin({ email, password });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
