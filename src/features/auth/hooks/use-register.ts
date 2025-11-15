import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "@/shared/hooks/use-app-dispatch";
import { TOAST_CONFIG, useToast } from "@/shared/lib/toast";

import { useConfirmCodeMutation, useRegisterMutation } from "../../../shared/api/auth/auth-api";
import { setTokens } from "../model/slice/auth-slice";
import { Confirm, Register } from "../model/types";

export const useRegister = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [registration, { status }] = useRegisterMutation();
  const [confirmCode] = useConfirmCodeMutation();
  const [error, setError] = useState<string | null>(null);

  console.log(status);

  const submitRegistration = async (data: Register) => {
    try {
      await registration(data).unwrap();
      navigate("/confirmation", { state: { email: data.email } });
    } catch (error: any) {
      setError(error?.data?.message || "An unknown error occurred");
    }
  };

  const submitConfirmationCode = async (data: Confirm) => {
    try {
      const response = await confirmCode(data).unwrap();
      dispatch(setTokens(response));
      navigate("/");
      toast(TOAST_CONFIG.registrationSuccess);
    } catch (error: any) {
      setError(error?.data?.message || "An unknown error occurred");
    }
  };

  return {
    submitRegistration,
    submitConfirmationCode,
    error,
    isRegistering: status === "pending",
  };
};
