import { Router } from "express";
import passport from "passport";
import { appConfig } from "../config/app.config";
import { googleLoginCallback } from "../controllers/auth.controller";

const authRoutes=Router();
const failedUrl =`${appConfig.FRONTEND_CALLBACK_ORIGIN}?status=failure`;

authRoutes.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

authRoutes.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: failedUrl,
    session: true,
  }),
  googleLoginCallback
);

export default authRoutes;