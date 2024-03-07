import express from "express";
import { registerUser, loginUser } from "./auth.controller";
import { loginSchema, registerSchema } from "./user.validator";
import { validateRequest } from "../../middlewares/validation.middleware";

const router = express.Router();

// Route for user registration
router.post("/auth/register", validateRequest(registerSchema), registerUser);

// Route for user login
router.post("/auth/login", validateRequest(loginSchema), loginUser);

export default router;
