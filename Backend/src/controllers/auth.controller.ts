import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { appConfig } from "../config/app.config";


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