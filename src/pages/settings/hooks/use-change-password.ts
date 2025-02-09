import { useState } from "react";
import { useForm } from "react-hook-form";

import { TOAST_CONFIG } from "@/features/toast";
import { useToast } from "@/features/toast";
import { useChangeUserPasswordMutation } from "@/modules/user";
import { UpdateUserPasswordDto } from "@/modules/user";
import { ApiError } from "@/shared/types";

interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export const useChangePassword = () => {
  const [error, setError] = useState<string | null>(null);
  const [changeUserPassword] = useChangeUserPasswordMutation();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    watch,
    reset,
  } = useForm<ChangePasswordData>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const onSubmit = handleSubmit(async (data: ChangePasswordData) => {
    const credentials: UpdateUserPasswordDto = {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    };
    try {
      await changeUserPassword(credentials).unwrap();
      toast(TOAST_CONFIG.changePasswordSuccess);
      reset();
      setError(null);
    } catch (error) {
      const apiError = error as ApiError;
      console.error(apiError);
      setError(apiError.data.message);
    }
  });

  return {
    error,
    formErrors,
    register,
    watch,
    onSubmit,
  };
};
