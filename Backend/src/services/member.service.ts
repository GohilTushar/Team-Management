import { roleConfig } from "../config/role-permission.config";
import MemberModel from "../models/member.model";
import RoleModel from "../models/role-permission.model";
import WorkspaceModel from "../models/workspace.model";

export const getMemberRoleInWorkspace = async (
  userId: string,
  workspaceId: string
) => {
  const workspace = await WorkspaceModel.findById(workspaceId);
  if (!workspace) {
    throw new Error("Workspace not found");
  }

  const member = await MemberModel.findOne({
    userId,
    workspaceId,
  }).populate("role");

  if (!member) {
    throw new Error(
      "You are not a member of this workspace"
    );
  }

  const roleName = member.role?.name;

  return { role: roleName };
};

export const joinWorkspaceByInviteService = async (
  userId: string,
  inviteCode: string
) => {
  // Find workspace by invite code
  const workspace = await WorkspaceModel.findOne({invitationCode: inviteCode }).exec();
  if (!workspace) {
    throw new Error("Invalid invite code or workspace not found");
  }

  // Check if user is already a member
  const existingMember = await MemberModel.findOne({
    userId,
    workspaceId: workspace._id,
  }).exec();

  if (existingMember) {
    throw new Error("You are already a member of this workspace");
  }

  const role = await RoleModel.findOne({ name: roleConfig.MEMBER });

  if (!role) {
    throw new Error("Role not found");
  }

  // Add user to workspace as a member
  const newMember = new MemberModel({
    userId,
    workspaceId: workspace._id,
    role: role._id,
  });
  await newMember.save();

  return { workspaceId: workspace._id, role: role.name };
};