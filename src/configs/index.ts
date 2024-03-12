import dotenv from "dotenv";
dotenv.config();

let config = {
  PORT: process.env.PORT || 3000,
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  REDIS_HOST: process.env.REDIS_HOST || "127.0.0.1",
  REDIS_USERNAME: process.env.REDIS_USERNAME || "default",
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || "my-top-secret",
  REDIS_DB: process.env.REDIS_DB || 0,
  NODE_ENV: process.env.NODE_ENV || "development",
  PROD_CORS_ORIGIN: process.env.PROD_CORS_ORIGIN || "",
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || "",
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || "",
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/ceta-ai",
  JSON_WEB_TOKEN_SECRET: process.env.JSON_WEB_TOKEN_SECRET || "my-top-secret",  
};

export default config;


