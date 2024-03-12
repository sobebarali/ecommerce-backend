import { Request, Response } from "express";
import Joi from "joi";
import runValidation from "../../../../utils/runValidation";
import register from "../../controllers/auth/register.controller";
export const registerSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")).required(),
});

export default async function endpointRegister(
  req: Request,
  res: Response
): Promise<any> {
  let validationResult = runValidation({
    payload: req.body,
    schema: registerSchema,
  });

  if (typeof validationResult.error !== "undefined") {
    return res.status(400).json({  
      data: null,
      error: {
        code: "VALIDATION_ERROR",
        message: validationResult.error.message,
      }
    });
  } else {
    let result = await register({ req, res });

    if (result.error) {
      return res.status(result.error.status).send(result.error);
    } else if (result.data) {
      return res.status(result.data.status).send(result.data);
    } else {
      return res.status(500).send({
        status: 500,
        code: "SOMETHING_WENT_WRONG",
        message: "Something went wrong",
      });
    }
  }
}
