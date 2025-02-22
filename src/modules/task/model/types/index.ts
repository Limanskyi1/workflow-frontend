export interface Task {
  id: number;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate?: Date;
  authorId: number;
  boardId: number;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}

export type CreateTask = Pick<
  Task,
  "title" | "description" | "status" | "priority" | "dueDate"
>;

export type UpdateTask = Partial<CreateTask>;

export type TaskPriority = "LOWEST" | "LOW" | "MEDIUM" | "HIGH" | "HIGHEST";

export type TaskStatus =
  | "IN_BOX"
  | "TO_DO"
  | "IN_PROGRESS"
  | "WAITING"
  | "IN_REVIEW"
  | "DONE";
