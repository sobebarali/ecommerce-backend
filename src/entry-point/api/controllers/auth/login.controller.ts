import { Request, Response } from "express";
import {
  typePayload,
  typeResult,
  typeResultData,
  typeResultError,
} from "../../types/auth/login.type";
import userLogin from "../../../../domain/handlers/auth/login.service";

export default async function login({
  req,
  res,
}: {
  req: Request;
  res: Response;
}): Promise<typeResult> {
  let data: null | typeResultData = null;
  let error: null | typeResultError = null;

  try {
    const { email, password } = req.body as typePayload;

    let token = await userLogin({
      email,
      password,
    });

    data = {
      status: 200,
      code: "USER_LOGIN_SUCCESS",
      message: "User logged in successfully",
      token,
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
