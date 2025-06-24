import mongoose, { Document, Schema, Model } from "mongoose";
import { IRole } from "./role-permission.model";

export interface IMember extends Document {
  userId: mongoose.Types.ObjectId;
  workspaceId: mongoose.Types.ObjectId;
  role: IRole
  joinedAt: Date;
}

const MemberSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    workspaceId: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
    role:{
        type:Schema.Types.ObjectId,
        ref: "Role",
        required: true,
    }
  },
  {
    timestamps: true,
  }
);

const MemberModel: Model<IMember> = mongoose.model<IMember>("Member", MemberSchema);

export default MemberModel;