import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { appConfig } from "../config/app.config";
import { registerSchema } from "../validation/auth.validation";
import { httpStatusCodeType } from "../config/http.config";
import { registerUserService } from "../services/auth.service";

export const googleLoginCallback = asyncHandler(
  async (req: Request, res: Response) => {
    const currentWorkspace = (req.user as any)?.currentWorkSpace;

    if (!currentWorkspace) {
      return res.redirect(
        `${appConfig.FRONTEND_CALLBACK_ORIGIN}?status=failure`
      );
    }

    return res.redirect(
      `${appConfig.FRONTEND_ORIGIN}/workspace/${currentWorkspace}`
    );
  }
);

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const body = registerSchema.parse({
      ...req.body,
    });

    await registerUserService(body);

    return res.status(httpStatusCodeType.CREATED).json({
      message: "User created successfully",
    });
  }
);

export const loginController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      "local",
      (
        err: Error | null,
        user: Express.User | false,
        info: { message: string } | undefined
      ) => {
        if (err) {
          return next(err);
        }

        if (!user) {
          return res.status(httpStatusCodeType.UNAUTHORIZED).json({
            message: info?.message || "Invalid email or password",
          });
        }

        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }

          return res.status(httpStatusCodeType.OK).json({
            message: "Logged in successfully",
            user,
          });
        });
      }
    )(req, res, next);
  }
);

export const logOutController = asyncHandler(
  async (req: Request, res: Response) => {
    req.logout((err) => {
      if (err) {
        console.error("Logout error:", err);
        return res
          .status(httpStatusCodeType.INTERNAL_SERVER_ERROR)
          .json({ error: "Failed to log out" });
      }

      req.session.destroy((err) => {
        if (err) {
          console.error("Session destroy error:", err);
          return res
            .status(httpStatusCodeType.INTERNAL_SERVER_ERROR)
            .json({ error: "Failed to destroy session" });
        }

        res.clearCookie("session");

        return res
          .status(httpStatusCodeType.OK)
          .json({ message: "Logged out successfully" });
      });
    });
  }
);
