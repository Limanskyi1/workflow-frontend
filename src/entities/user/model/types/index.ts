export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export type UpdateUser = Partial<User>;

export type UpdateUserPassword = {
  currentPassword: string;
  newPassword: string;
};
