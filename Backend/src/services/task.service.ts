import moment from "moment";
import { taskPriorityConfig, taskStatusConfig } from "../config/task.config";
import MemberModel from "../models/member.model";
import ProjectModel from "../models/project.model";
import TaskModel from "../models/task.model";

export const createTaskService = async (
  workspaceId: string,
  projectId: string,
  userId: string,
  body: {
    title: string;
    description?: string;
    priority?: string;
    status?: string;
    assignedTo?: string | null;
    dueDate?: Date|null;
  }
) => {
  const { title, description, priority, status, assignedTo, dueDate } = body;

  const project = await ProjectModel.findById(projectId);

  if (!project || project.workspaceId.toString() !== workspaceId.toString()) {
    throw new Error(
      "Project not found or does not belong to this workspace"
    );
  }
  if (assignedTo) {
    const isAssignedUserMember = await MemberModel.exists({
      userId: assignedTo,
      workspaceId,
    });

    if (!isAssignedUserMember) {
      throw new Error("Assigned user is not a member of this workspace.");
    }
  }
  const task = new TaskModel({
    title,
    description,
    priority: priority || taskPriorityConfig.MEDIUM,
    status: status || taskStatusConfig.TODO,
    assignedTo,
    createdBy: userId,
    workspaceId,
    projectId,
    dueDate,
  });

  await task.save();

  return { task };
};

export const updateTaskService = async (
  workspaceId: string,
  projectId: string,
  taskId: string,
  body: {
    title: string;
    description?: string;
    priority?: string;
    status?: string;
    assignedTo?: string | null;
    dueDate?: Date|null;
  }
) => {
  const project = await ProjectModel.findById(projectId);

  if (!project || project.workspaceId.toString() !== workspaceId.toString()) {
    throw new Error(
      "Project not found or does not belong to this workspace"
    );
  }

  const task = await TaskModel.findById(taskId);

  if (!task || task.projectId.toString() !== projectId.toString()) {
    throw new Error(
      "Task not found or does not belong to this project"
    );
  }

  const updatedTask = await TaskModel.findByIdAndUpdate(
    taskId,
    body,
    { new: true }
  );

  if (!updatedTask) {
    throw new Error("Failed to update task");
  }

  return { updatedTask };
};

export const getAllTasksService = async (
  workspaceId: string,
  filters: {
    projectId?: string;
    status?: string[];
    priority?: string[];
    assignedTo?: string[];
    keyword?: string;
    dueDate?: string;
  },
  pagination: {
    pageNumber: number;
    pageSize: number;
  }
) => {
  const query: Record<string, any> = {
    workspaceId,
  };

  if (filters.projectId) {
    query.projectId = filters.projectId;
  }

  if (filters.status && filters.status?.length) {
    query.status = { $in: filters.status };
  }

  if (filters.priority && filters.priority?.length) {
    query.priority = { $in: filters.priority };
  }

  if (filters.assignedTo && filters.assignedTo?.length > 0) {
    query.assignedTo = { $in: filters.assignedTo };
  }

  if (filters.keyword && filters.keyword !== undefined) {
    query.title = { $regex: filters.keyword, $options: "i" };
  }
  
  if (filters.dueDate) {
    const fromDate=moment(filters.dueDate,'YYYY/MM/DD').utc().toISOString()
    const toDate=moment(filters.dueDate,'YYYY/MM/DD').add(1,"day").utc().toISOString()
    query.dueDate= {
    $gt: fromDate,
    $lt: toDate
  }
  }

  //Pagination Setup
  const {pageNumber,pageSize} = pagination;
  const skip = (pageNumber - 1) * pageSize;

  const [tasks, totalCount] = await Promise.all([
    TaskModel.find(query)
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .populate("assignedTo", "_id name profilePicture -password")
      .populate("projectId", "_id emoji name"),
    TaskModel.countDocuments(query),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    tasks,
    pagination: {
      pageSize,
      pageNumber,
      totalCount,
      totalPages,
      skip,
    },
  };
};

export const getTaskByIdService = async (
  workspaceId: string,
  projectId: string,
  taskId: string
) => {
  const project = await ProjectModel.findById(projectId);

  if (!project || project.workspaceId.toString() !== workspaceId.toString()) {
    throw new Error(
      "Project not found or does not belong to this workspace"
    );
  }

  const task = await TaskModel.findOne({
    _id: taskId,
    workspaceId,
    projectId,
  }).populate("assignedTo", "_id name profilePicture -password");

  if (!task) {
    throw new Error("Task not found.");
  }

  return task;
};

export const deleteTaskService = async (
  workspaceId: string,
  projectId:string,
  taskId: string
) => {

  const project = await ProjectModel.findById(projectId);

  if (!project || project.workspaceId.toString() !== workspaceId.toString()) {
    throw new Error(
      "Project not found or does not belong to this workspace"
    );
  }

  const task = await TaskModel.findOneAndDelete({
    _id: taskId,
    workspaceId,
    projectId
  });

  if (!task) {
    throw new Error(
      "Task not found or does not belong to the specified workspace"
    );
  }

  return task;
};