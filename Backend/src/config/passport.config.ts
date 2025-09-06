import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import { Request } from "express";
import { appConfig } from "./app.config";
import { accountProviderConfig } from "./accountProvider.config";
import { loginOrCreateAccountService, verifyUserService } from "../services/auth.service";

passport.use(
  new GoogleStrategy(
    {
      clientID: appConfig.GOOGLE_CLIENT_ID,
      clientSecret: appConfig.GOOGLE_CLIENT_SECRET,
      callbackURL: appConfig.GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
      scope: ["profile", "email"],
    },
    async (req: Request, accessToken, refreshToken, profile, done) => {
      try {
        const { email, sub: googleId, picture } = profile._json;
        if (!googleId) {
          return done(new Error("Google ID or email not found in profile"));
        }
        const user  = await loginOrCreateAccountService({
          provider: accountProviderConfig.GOOGLE,
          providerId: googleId,
          displayName: profile.displayName || "",
          email: email,
          picture: picture || "",
        });
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: true,
    },
    async (email, password, done) => {
      try {
        const user = await verifyUserService({ email, password });
        return done(null, user);
      } catch (error: any) {
        return done(error, false, { message: error?.message });
      }
    }
  )
);

passport.serializeUser((user: any, done) => done(null, user));
passport.deserializeUser((user: any, done) => done(null, user));