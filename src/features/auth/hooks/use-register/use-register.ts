import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "@/shared/hooks/use-app-dispatch";
import { TOAST_CONFIG, useToast } from "@/shared/lib/toast";

import { useRegisterMutation } from "../../api/auth-api";
import { setTokens } from "../../model/slice/auth-slice";
import { Register } from "../../model/types";

export const useRegister = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [registration] = useRegisterMutation();
  const { toast } = useToast();

  const onSubmit = async (data: Register) => {
    try {
      const response = await registration(data).unwrap();
      dispatch(setTokens(response));
      navigate("/");
      toast(TOAST_CONFIG.registrationSuccess);
    } catch (error: any) {
      setError(error?.data?.message || "An unknown error occurred");
    }
  };

  return {
    onSubmit,
    error,
  };
};
