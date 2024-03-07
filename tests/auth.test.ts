import request from "supertest";
import app from "../app/app";
import { randomUUID } from "crypto";

describe("Auth Endpoints", () => {
  describe("POST /api/auth/register", () => {

    it("should not register a new user with invalid data", async () => {
      const response = await request(app).post("/api/auth/register").send({
        username: "testuser",
        email: " ",
        password: "password123",
        fullName: "Test User",
        address: "123 Main St",
        phone: "1234567890",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "message",
        'Validation error: "email" must be a valid email'
      );
    });

    it("should register a new user", async () => {
      const response = await request(app)
        .post("/api/auth/register")
        .send({
          username: "testuser",
          email: randomUUID() + "@example.com",
          password: "password123",
          fullName: "Test User",
          address: "123 Main St",
          phone: "1234567890",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty(
        "message",
        "User registered successfully"
      );
    });

    it("should not register a new user with an existing email", async () => {

      let email = randomUUID() + "@example.com";

      const response = await request(app)
        .post("/api/auth/register")
        .send({
          username: "testuser",
          email,
          password: "password123",
          fullName: "Test User",
          address: "123 Main St",
          phone: "1234567890"
        });
      
      expect(response.status).toBe(201);

      const response2 = await request(app)
        .post("/api/auth/register")
        .send({
          username: "testuser",
          email,
          password: "password123",
          fullName: "Test User",
          address: "123 Main St",
          phone: "1234567890"
        });
      
      expect(response2.status).toBe(409);
      expect(response2.body).toHaveProperty(
        "message",
        "User with this email already exists"
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
      expect(response.body).toHaveProperty("token");
    });

    it("should not login with invalid credentials", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: randomUUID() + "@example.com",
        password: "testpassword2435",
      });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty(
        "message",
        "Invalid email or password"
      );
    });
  });
});
