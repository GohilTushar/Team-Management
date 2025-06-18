import { getEnv } from "../utils/get-env";

export const appConfig = {
  PORT: getEnv("PORT", "3030"),
  NODE_ENV: getEnv("NODE_ENV", "development"),
  MONGO_URI: getEnv("MONGO_URI", ""),
  BASE_PATH: getEnv("BASE_PATH", "/api"),

  GOOGLE_CLIENT_ID: getEnv("GOOGLE_CLIENT_ID", ""),
  GOOGLE_CLIENT_SECRET: getEnv("GOOGLE_CLIENT_SECRET", ""),
  GOOGLE_CALLBACK_URL: getEnv("GOOGLE_CALLBACK_URL", ""),

  JWT_SECRET: getEnv("JWT_SECRET", ""),
  JWT_EXPIRATION: getEnv("JWT_EXPIRATION", "1h"),

  SESSION_SECRET: getEnv("SESSION_SECRET", ""),
  SESSION_EXPIRATION: getEnv("SESSION_EXPIRATION", "1d"),

  FRONTEND_ORIGIN: getEnv("FRONTEND_ORIGIN", ""),
  FRONTEND_CALLBACK_ORIGIN: getEnv("FRONTEND_CALLBACK_ORIGIN", ""),
};
