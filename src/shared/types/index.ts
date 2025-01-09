export interface ApiError {
  status: number;
  data: {
    message: string;
  };
}

export type TaskStatus =
    "IN_BOX"
  | "TO_DO"
  | "IN_PROGRESS"
  | "WAITING"
  | "IN_REVIEW"
  | "DONE";

export type TaskPriority = 
    "LOWEST" 
  | "LOW" 
  | "MEDIUM" 
  | "HIGH" 
  | "HIGHEST";
