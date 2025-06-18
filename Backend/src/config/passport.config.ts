import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Request } from "express";
import { appConfig } from "./app.config";
import { accountProviderConfig } from "./accountProvider.config";
import { loginOrCreateAccountService } from "../services/auth.service";

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
        console.log(profile);
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

passport.serializeUser((user: any, done) => done(null, user));
passport.deserializeUser((user: any, done) => done(null, user));