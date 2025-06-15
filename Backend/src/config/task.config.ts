export const taskStatusConfig = {
  BACKLOG: "BACKLOG",
  TODO: "TODO",
  IN_PROGRESS: "IN_PROGRESS",
  IN_REVIEW: "IN_REVIEW",
  DONE: "DONE",
};

export const taskPriorityConfig = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
};

export type TaskStatusEnum = keyof typeof taskStatusConfig;
export type TaskPriorityEnum = keyof typeof taskPriorityConfig;
