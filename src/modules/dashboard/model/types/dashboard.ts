import { ColumnType } from "@/modules/column";

export interface Dashboard {
  id: number;
  title: string;
  ownerId: number;
  columns: ColumnType[];
  createdAt: string;
  updatedAt: string;
}
