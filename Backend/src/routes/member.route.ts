import { Router } from "express";
import { joinWorkspaceController } from "../controllers/member.controller";

const memberRoutes = Router();

memberRoutes.post("/workspace/:invitationCode/join", joinWorkspaceController);

export default memberRoutes;