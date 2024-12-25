import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { FormField } from "@/shared/ui/form-field";

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
          <FormField
            id="current-password"
            type="password"
            label="Current password"
            register={register("current-password", {
              required: "Current password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            error={formErrors["current-password"]?.message}
          />
          <FormField
            id="new-password"
            type="password"
            label="New password"
            register={register("new-password", {
              required: "New password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            error={formErrors["new-password"]?.message}
          />
          <FormField
            id="confirm-new-password"
            type="password"
            label="Confirm new password"
            register={register("confirm-new-password", {
              required: "Confirm password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
              validate: (value) =>
                value === watch("new-password") || "Passwords do not match",
            })}
            error={formErrors["confirm-new-password"]?.message}
          />
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit">Update password</Button>
        </form>
      </CardContent>
    </Card>
  );
};
