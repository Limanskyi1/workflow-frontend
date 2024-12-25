import { useState } from "react";
import { useForm } from "react-hook-form";

import { useChangeUserPasswordMutation } from "@/modules/user/api/user-api";
import { UpdateUserPasswordDto } from "@/modules/user/model/types/update-user-password.dto";
import { TOAST_CONFIG } from "@/shared/consts/toast-config";
import { useToast } from "@/shared/hooks/use-toast";
import { ApiError } from "@/shared/types";

interface ChangePasswordData {
  "current-password": string;
  "new-password": string;
  "confirm-new-password": string;
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
      currentPassword: data["current-password"],
      newPassword: data["new-password"],
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
