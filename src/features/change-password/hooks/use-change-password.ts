import { useState } from "react";

import {
  UpdateUserPassword,
  useChangeUserPasswordMutation,
} from "@/entities/user";
import { TOAST_CONFIG } from "@/shared/lib/toast";
import { useToast } from "@/shared/lib/toast";
import { ApiError } from "@/shared/types";

interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export const useChangePassword = () => {
  const { toast } = useToast();
  const [changeUserPassword] = useChangeUserPasswordMutation();
  const [error, setError] = useState<string | null>(null);

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
    error,
    changePassword,
  };
};
