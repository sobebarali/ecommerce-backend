import { Request, Response } from "express";
import userCreate from "../../../../domain/handlers/auth/register.service";
import {
  typePayload,
  typeResult,
  typeResultData,
  typeResultError,
} from "../../types/auth/register.type";

export default async function register({
  req,
  res,
}: {
  req: Request;
  res: Response;
}): Promise<typeResult> {
  let data: null | typeResultData = null;
  let error: null | typeResultError = null;

  try {
    const { name, email, password } = req.body as typePayload;

    await userCreate({
      name,
      email,
      password,
    });

    data = {
      status: 201,
      code: "USER_REGISTER_SUCCESS",
      message: "User registered successfully",
    };
  } catch (err: any) {
    error = {
      status: err.statusCode || 500,
      code: err.errorCode || "SOMETHING_WENT_WRONG",
      message: err.message || "Something went wrong",
    };
  }

  return { data, error };
}
