import { Navigate, useLocation } from "react-router-dom";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/shared/ui/input-otp";

import { useRegister } from "../hooks/use-register";
import { AuthLayout } from "../layouts/auth-layout";
import { AuthError } from "./auth-error/auth-error";
import { AuthHeader } from "./auth-header/auth-header";

export const ConfirmCode = () => {
  const location = useLocation();
  const email = location.state?.email;
  const { error, submitConfirmationCode } = useRegister();

  if (!email) {
    return <Navigate to="/login" replace />;
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-md space-y-8 flex flex-col items-center justify-center">
        <AuthHeader text="Confirm code to Workflow" />
        <p>Code has been sent to {email}</p>
        <InputOTP
          maxLength={6}
          onComplete={(code) => {
            submitConfirmationCode({
              code,
              email,
            });
          }}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <AuthError errorText={error || undefined} />
      </div>
    </AuthLayout>
  );
};
