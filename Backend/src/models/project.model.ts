import mongoose, { Document, Schema, Model } from "mongoose";

export interface IProject extends Document {
  name: string;
  description: string;
  emoji: string;
  workspaceId: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
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
    emoji: {
      type: String,
      default: "📁", // Default emoji for projects
    },
    workspaceId: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const ProjectModel:Model<IProject> = mongoose.model<IProject>("Project", ProjectSchema);

export default ProjectModel;