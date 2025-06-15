import mongoose, { Document, Schema, Model } from "mongoose";
import {
  taskPriorityConfig,
  TaskPriorityEnum,
  taskStatusConfig,
  TaskStatusEnum,
} from "../config/task.config";
import { generateTaskCode } from "../utils/uuid";

export interface ITask extends Document {
  taskCode: string;
  title: string;
  description: string;
  status: TaskStatusEnum;
  priority: TaskPriorityEnum;
  dueDate: Date | null;
  projectId: Schema.Types.ObjectId;
  assignedTo: Schema.Types.ObjectId | null;
  workspaceId: Schema.Types.ObjectId;
  createdBy: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema(
  {
    taskCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      default:generateTaskCode 
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
      type: String,
      enum: Object.values(taskStatusConfig),
      default: taskStatusConfig.TODO,
    },
    priority: {
      type: String,
      enum: Object.values(taskPriorityConfig),
      default: taskPriorityConfig.MEDIUM,
    },
    dueDate: {
      type: Date,
      default: null,
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
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
  { timestamps: true }
);
