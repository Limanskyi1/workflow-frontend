import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input/input";
import { InputPassword } from "@/shared/ui/input/input-password";

import { useRegister } from "../hooks/use-register";
import { AuthLayout } from "../layouts/auth-layout";
import { Register } from "../model/types";
import { AuthError } from "./auth-error/auth-error";
import { AuthHeader } from "./auth-header/auth-header";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<Register>();

  const { isRegistering, submitRegistration, error } = useRegister();

  return (
    <AuthLayout>
      <div className="w-full max-w-md space-y-8">
        <AuthHeader text="Sign up to Workflow" />
        <form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit(submitRegistration)}
        >
          <div className="space-y-4 rounded-md flex flex-col gap-4">
            <Input
              label="Name"
              error={formErrors.name?.message}
              {...register("name", {
                required: "Name is required",
              })}
            />
            <Input
              label="Email"
              error={formErrors.email?.message}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            <InputPassword
              label="Password"
              error={formErrors.password?.message}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
          </div>

          <Button
            disabled={isRegistering}
            type="submit"
            className="w-full"
            size="lg"
          >
            Sign up
          </Button>

          <AuthError errorText={error || undefined} />

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary hover:text-primary/80"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};
