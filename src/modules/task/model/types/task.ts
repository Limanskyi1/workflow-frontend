import { TaskPriority } from "./task-priority";
import { TaskStatus } from "./task-status";

export interface Task {
  id: number;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate?: string;
  authorId: number;
  boardId: number;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}
