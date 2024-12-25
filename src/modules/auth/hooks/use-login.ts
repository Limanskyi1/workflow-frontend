import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { TOAST_CONFIG } from "@/shared/consts/toast-config";
import { useAppDispatch } from "@/shared/hooks/use-app-dispatch";
import { useToast } from "@/shared/hooks/use-toast";

import { useLoginMutation } from "../api/auth-api";
import { setTokens } from "../model/slice/auth-slice";
import { LoginDto } from "../model/types/login.dto";

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<LoginDto>();
  const [login] = useLoginMutation();

  const onSubmit = handleSubmit(async (data: LoginDto) => {
    try {
      const response = await login(data).unwrap();
      dispatch(setTokens(response));
      navigate("/");
      toast(TOAST_CONFIG.loginSuccess);
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
