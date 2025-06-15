import mongoose, { Document, Schema, Model } from "mongoose";
import { generateUUID } from "../utils/uuid";

export interface IWorkspace extends Document {
  name: string;
  description: string;
  ownerId: Schema.Types.ObjectId;
  invitationCode: string;
  resetInvitationCode:() => void;
  createdAt: Date;
  updatedAt: Date;
}

const WorkspaceSchema = new Schema<IWorkspace>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    invitationCode: {
      type: String,
      required: true,
      unique: true,
      default:generateUUID
    },
  },
  {
    timestamps: true,
  }
);

WorkspaceSchema.methods.resetInvitationCode = async function (): Promise<void> {
  this.invitationCode = generateUUID();
};

const WorkspaceModel:Model<IWorkspace> = mongoose.model<IWorkspace>("Workspace", WorkspaceSchema);

export default WorkspaceModel;
