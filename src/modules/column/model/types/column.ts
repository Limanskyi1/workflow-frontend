import { Task } from "@/modules/task/model/types/task";
import { TaskStatus } from "@/shared/types";

export interface Column {
  id: number;
  name: string;
  status: TaskStatus;
  boardId: number;
  tasks: Task[];
  createdAt: string;
  updatedAt: string;
}
