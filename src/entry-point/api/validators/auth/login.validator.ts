import { Request, Response } from "express";
import Joi from "joi";
import runValidation from "../../../../utils/runValidation";
import login from "../../controllers/auth/login.controller";


export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")).required(),
});

export default async function endpointLogin(
  req: Request,
  res: Response
): Promise<any> {
  let validationResult = runValidation({
    payload: req.body,
    schema: loginSchema,
  });

  if (typeof validationResult.error !== "undefined") {
    return res.status(400).json({ 
      data: null,
      error: {
        code: "VALIDATION_ERROR",
        message: validationResult.error,
      }
     });
  } else {
    let result = await login({ req, res });
     if (result.error) {
       return res.status(result.error.status).send(result.error);
     } else {
       return res.status(result?.data?.status || 500).send(result.data);
     } 
  }
}
