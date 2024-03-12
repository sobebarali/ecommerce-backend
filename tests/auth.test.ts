import request from "supertest";
import app from "../src/app";
import { randomUUID } from "crypto";

describe("Auth Endpoints", () => {
  describe("POST /api/auth/register", () => {
    it("should not register a new user with invalid data", async () => {
      const response = await request(app).post("/api/auth/register").send({
        username: "testuser",
        email: " ",
        password: "password123",
      });

      expect(response.status).toBe(400);
      expect(response.body.data).toBe(null);
      expect(response.body.error).toHaveProperty("code", "VALIDATION_ERROR");
      expect(response.body.error).toHaveProperty(
        "message",
        '"name" is required'
      );
    });

    it("should register a new user", async () => {
      const response = await request(app)
        .post("/api/auth/register")
        .send({
          name: "testuser",
          email: randomUUID() + "@example.com",
          password: "password123",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("code", "USER_REGISTER_SUCCESS");

      expect(response.body).toHaveProperty(
        "message",
        "User registered successfully"
      );
    });

    it("should not register a new user with an existing email", async () => {
      let email = randomUUID() + "@example.com";

      const response = await request(app).post("/api/auth/register").send({
        name: "testuser",
        email,
        password: "password123",
      });

      expect(response.status).toBe(201);

      const response2 = await request(app).post("/api/auth/register").send({
        name: "testuser",
        email,
        password: "password123",
      });

      expect(response2.status).toBe(409);
      expect(response2.body).toHaveProperty("code", "USER_ALREADY_EXISTS");
      expect(response2.body).toHaveProperty(
        "message",
        "User already exists with this email address"
      );
    });
  });

  describe("POST /api/auth/login", () => {
    it("should login with valid credentials", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: "test@example.com",
        password: "password123",
      });
   
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("code", "USER_LOGIN_SUCCESS");
      expect(response.body).toHaveProperty(
        "message",
        "User logged in successfully"
      );
      expect(response.body).toHaveProperty("token");
  
    });

    it("should not login with unregister user", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: randomUUID() + "@example.com",
        password: "testpassword2435",
      });
    
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("code", "USER_NOT_FOUND");
      expect(response.body).toHaveProperty(
        "message",
        "No user found for this email address"
      );
    });

    it("should not login with invalid password", async () => {
      let email = randomUUID() + "@example.com";
      const register = await request(app).post("/api/auth/register").send({
        name: "testuser",
        email,
        password: "password123",
      });

      expect(register.status).toBe(201);

      const login = await request(app).post("/api/auth/login").send({
        email,
        password: "testpassword2435",
      });
      
      expect(login.status).toBe(401);
      expect(login.body).toHaveProperty("code", "INVALID_PASSWORD");
      expect(login.body).toHaveProperty(
        "message",
        "Invalid password provided"
      );
    });
  });
});
