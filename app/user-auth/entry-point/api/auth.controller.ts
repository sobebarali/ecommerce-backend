import { Request, Response, NextFunction } from "express";
import { registerUserFlow, loginUserFlow } from "../../domain/user.flow";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password, fullName, address, phone } = req.body;

    await registerUserFlow({
      username,
      email,
      password,
      fullName,
      address,
      phone,
    });

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

    const token = await loginUserFlow({ email, password });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
