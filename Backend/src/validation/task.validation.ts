import { z } from "zod";
import { taskPriorityConfig, taskStatusConfig } from "../config/task.config";

export const titleSchema = z.string().trim().min(1).max(255);
export const descriptionSchema = z.string().trim().optional();

export const assignedToSchema = z.string().trim().min(1).nullable().optional();

export const prioritySchema = z.enum(
  Object.values(taskPriorityConfig) as [string, ...string[]]
).optional();

export const statusSchema = z.enum(
  Object.values(taskStatusConfig) as [string, ...string[]]
).optional();

export const dueDateSchema = z
  .preprocess(
    (val) => (val ? new Date(val as string) : val),
    z.date()
  )
  .optional()
  .nullable();

export const taskIdSchema = z.string().trim().min(1);

export const createTaskSchema = z.object({
  title: titleSchema,
  description: descriptionSchema,
  priority: prioritySchema,
  status: statusSchema,
  assignedTo: assignedToSchema,
  dueDate: dueDateSchema,
});

export const updateTaskSchema = z.object({
  title: titleSchema,
  description: descriptionSchema,
  priority: prioritySchema,
  status: statusSchema,
  assignedTo: assignedToSchema,
  dueDate: dueDateSchema,
});