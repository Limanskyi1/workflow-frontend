import { Link } from "react-router-dom";

import { Button } from "@/shared/ui/button";
import { InputFactory } from "@/shared/ui/input/input-factory";

import { useLogin } from "../hooks/use-login";
import { AuthLayout } from "../layouts/auth-layout";
import { AuthError } from "./auth-error/auth-error";
import { AuthHeader } from "./auth-header/auth-header";

export const LoginForm = () => {
  const { register, formErrors, onSubmit, error } = useLogin();

  return (
    <AuthLayout>
      <div className="w-full max-w-md space-y-8">
        <AuthHeader text="Sign in to Workflow" />
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="space-y-4 rounded-md flex flex-col gap-4">
            <InputFactory
              variant="labelAndError"
              options={{
                label: "Email",
                error: formErrors.email?.message,
              }}
              register={register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            <InputFactory
              variant="labelAndError"
              type="password"
              options={{
                label: "Password",
                error: formErrors.password?.message,
              }}
              register={register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
          </div>

          <Button type="submit" className="w-full" size="lg">
            Sign in
          </Button>

          <AuthError errorText={error || undefined} />

          <p className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-primary hover:text-primary/80"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};
