import { Request, Response } from "express";
import { z } from "zod";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { httpStatusCodeType } from "../config/http.config";
import { joinWorkspaceByInviteService } from "../services/member.service";

export const joinWorkspaceController = asyncHandler(
  async (req: Request, res: Response) => {
    const invitationCode = z.string().parse(req.params.invitationCode);
    const userId = req.user?._id;

    const { workspaceId, role } = await joinWorkspaceByInviteService(
      userId,
      invitationCode
    );

    return res.status(httpStatusCodeType.OK).json({
      message: "Successfully joined the workspace",
      workspaceId,
      role,
    });
  }
);