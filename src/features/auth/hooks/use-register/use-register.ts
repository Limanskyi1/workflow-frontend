import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { TOAST_CONFIG, useToast } from "@/features/toast";
import { useAppDispatch } from "@/shared/hooks/use-app-dispatch";

import { useRegisterMutation } from "../../api/auth-api";
import { setTokens } from "../../model/slice/auth-slice";
import { RegisterDto } from "../../model/types/register.dto";

export const useRegister = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [registration] = useRegisterMutation();
  const { toast } = useToast();

  const onSubmit = async (data: RegisterDto) => {
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
