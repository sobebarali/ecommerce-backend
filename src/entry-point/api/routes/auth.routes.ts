import express from "express";
import endpointRegisterUser from "../validators/auth/register.validator";
import endpointLogin from "../validators/auth/login.validator";

const router = express.Router();

// Route for user registration
router.post("/auth/register", endpointRegisterUser);

// Route for user login
router.post("/auth/login", endpointLogin);

export default router;
