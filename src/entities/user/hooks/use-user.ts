import { useState } from "react";

import { TOAST_CONFIG, useToast } from "@/shared/lib/toast";
import { ApiError } from "@/shared/types";

import {
  useChangeUserPasswordMutation,
  useGetMeQuery,
  useUpdateUserMutation,
} from "@/shared/api/users/users-api";
import { UpdateUser, UpdateUserPassword } from "../model/types";

interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export const useUser = () => {
  const { toast } = useToast();
  const { data: userData, isLoading } = useGetMeQuery();
  const [updateUser] = useUpdateUserMutation();
  const [changeUserPassword] = useChangeUserPasswordMutation();
  const [error, setError] = useState<string | null>(null);

  const update = async (updatedUserData: UpdateUser) => {
    try {
      await updateUser({
        ...updatedUserData,
        id: userData?.id as number,
      });
      toast(TOAST_CONFIG.updateUserSuccess);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  const changePassword = async (data: ChangePasswordData) => {
    const credentials: UpdateUserPassword = {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    };
    try {
      await changeUserPassword(credentials).unwrap();
      toast(TOAST_CONFIG.changePasswordSuccess);
      setError(null);
    } catch (error) {
      console.error(error as ApiError);
      setError((error as ApiError).data.message);
    }
  };

  return {
    userData,
    isUserLoading: isLoading,
    update,
    changePassword,
    error,
  };
};
