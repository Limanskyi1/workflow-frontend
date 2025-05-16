import { useForm } from "react-hook-form";

import { useUser } from "@/entities/user";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { InputPassword } from "@/shared/ui/input/input-password";

interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export const ChangePassword = () => {
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

  const { error, changePassword } = useUser();

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription>
          Change your password to keep your account secure.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-4"
          onSubmit={handleSubmit(async (data) => {
            await changePassword(data);
            reset();
          })}
        >
          <InputPassword
            label="Current password"
            error={formErrors.currentPassword?.message}
            {...register("currentPassword", {
              required: "Current password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          <InputPassword
            label="New password"
            error={formErrors.newPassword?.message}
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          <InputPassword
            label="Confirm new password"
            error={formErrors.confirmNewPassword?.message}
            {...register("confirmNewPassword", {
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
