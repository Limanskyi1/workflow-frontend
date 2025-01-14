import { Task } from "@/modules/task/model/types/task";
import { TaskStatus } from "@/modules/task/model/types/task-status";

export interface Column {
  id: number;
  name: string;
  status: TaskStatus;
  boardId: number;
  tasks: Task[];
  createdAt: string;
  updatedAt: string;
}
