import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { TOAST_CONFIG } from "@/shared/consts/toast-config";
import { useAppDispatch } from "@/shared/hooks/use-app-dispatch";
import { toast } from "@/shared/hooks/use-toast";

import { useRegisterMutation } from "../api/auth-api";
import { setTokens } from "../model/slice/auth-slice";
import { RegisterDto } from "../model/types/register.dto";

export const useRegister = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<RegisterDto>();
  const [registration] = useRegisterMutation();

  const onSubmit = handleSubmit(async (data: RegisterDto) => {
    try {
      const response = await registration(data).unwrap();
      dispatch(setTokens(response));
      navigate("/");
      toast(TOAST_CONFIG.registrationSuccess);
    } catch (error: any) {
      console.error(error);
      setError(error.data.message);
    }
  });

  return {
    register,
    formErrors,
    error,
    onSubmit,
  };
};
