import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { InputFactory } from "@/shared/ui/input/input-factory";

import { useChangePassword } from "../../hooks/use-change-password";

export const ChangePassword = () => {
  const { error, onSubmit, formErrors, register, watch } = useChangePassword();

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription>
          Change your password to keep your account secure.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={onSubmit}>
          <InputFactory
            variant="labelAndError"
            options={{
              label: "Current password",
              error: formErrors.currentPassword?.message,
            }}
            register={register("currentPassword", {
              required: "Current password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          <InputFactory
            variant="labelAndError"
            options={{
              label: "New password",
              error: formErrors.newPassword?.message,
            }}
            register={register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          <InputFactory
            variant="labelAndError"
            options={{
              label: "Confirm new password",
              error: formErrors.confirmNewPassword?.message,
            }}
            register={register("confirmNewPassword", {
              required: "Confirm password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
              validate: (value) =>
                value === watch("newPassword") || "Passwords do not match",
            })}
          />
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit">Update password</Button>
        </form>
      </CardContent>
    </Card>
  );
};
