import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "@/shared/hooks/use-app-dispatch";
import { TOAST_CONFIG, useToast } from "@/shared/lib/toast";

import { useLoginMutation } from "../../api/auth-api";
import { setTokens } from "../../model/slice/auth-slice";
import { Login } from "../../model/types";

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: Login) => {
    try {
      const response = await login(data).unwrap();
      dispatch(setTokens(response));
      navigate("/");
      toast(TOAST_CONFIG.loginSuccess);
    } catch (error: any) {
      setError(error?.data?.message || "An unknown error occurred");
    }
  };

  return {
    error,
    onSubmit,
  };
};
