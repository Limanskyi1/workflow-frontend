import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { TOAST_CONFIG, useToast } from "@/features/toast";
import { useAppDispatch } from "@/shared/hooks/use-app-dispatch";

import { useLoginMutation } from "../../api/auth-api";
import { setTokens } from "../../model/slice/auth-slice";
import { LoginDto } from "../../model/types/login.dto";

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [login] = useLoginMutation();

  const onSubmit = async (data: LoginDto) => {
    try {
      const response = await login(data).unwrap();
      dispatch(setTokens(response));
      navigate("/");
      toast(TOAST_CONFIG.loginSuccess);
    } catch (error: any) {
      console.error(error);
      setError(error?.data?.message || "An unknown error occurred");
    }
  };

  return {
    error,
    onSubmit
  };
};
