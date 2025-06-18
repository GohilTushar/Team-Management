import mongoose from "mongoose";
import UserModel from "../models/user.model";
import AccountModel from "../models/account.model";
import WorkspaceModel from "../models/workspace.model";
import RoleModel from "../models/role-permission.model";
import { roleConfig } from "../config/role-permission.config";
import MemberModel from "../models/member.model";

export const loginOrCreateAccountService = async (data: {
  provider: string;
  providerId: string;
  displayName: string;
  email?: string;
  picture?: string;
}) => {
  const { provider, providerId, displayName, email, picture } = data;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    console.log("Session Started");

    let user = await UserModel.findOne({ email }).session(session);
    if (!user) {
      user = new UserModel({
        name: displayName,
        email,
        profilePicture: picture,
      });
      await user.save({ session });

      const account = new AccountModel({
        userId: user._id,
        provider,
        providerId,
      });
      await account.save({ session });

      const workspace = new WorkspaceModel({
        name: `My Workspace`,
        description: `Workspace created for ${user.name}`,
        ownerId: user._id,
      });
      await workspace.save({ session });

       const ownerRole = await RoleModel.findOne({
        name: roleConfig.OWNER,
      }).session(session);

      if (!ownerRole) {
        throw new Error("Owner role not found");
      }

      const member = new MemberModel({
        userId: user._id,
        workspaceId: workspace._id,
        role: ownerRole._id,
        joinedAt: new Date(),
      });
      await member.save({ session });

      user.currentWorkSpace = workspace?._id as mongoose.Schema.Types.ObjectId;
      await user.save({ session });
    }
    await session.commitTransaction();
    console.log("Session Committed");

    session.endSession();
    console.log("Session Ended");

    return user ;
  } catch (error) {
    await session.abortTransaction();
    console.error("Error in loginOrCreateAccountService:", error);
    session.endSession()
  }
  finally{
    session.endSession();
    console.log("Session Ended in finally block");
  }
};
