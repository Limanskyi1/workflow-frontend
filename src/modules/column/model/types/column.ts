import { Task } from "@/modules/task";
import { TaskStatus } from "@/modules/task";

export interface Column {
  id: number;
  name: string;
  status: TaskStatus;
  boardId: number;
  tasks: Task[];
  createdAt: string;
  updatedAt: string;
}
