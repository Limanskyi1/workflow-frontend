export interface User {
  id: string;
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
