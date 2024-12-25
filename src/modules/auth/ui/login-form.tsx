import { Trello } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/shared/ui/button";
import { FormField } from "@/shared/ui/form-field";

import { useLogin } from "../hooks/use-login";
import { AuthLayout } from "../layouts/auth-layout";

export const LoginForm = () => {
  const { register, formErrors, onSubmit, error } = useLogin();

  return (
    <AuthLayout>
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <Trello className="h-12 w-12" />
          <h2 className="mt-6 text-center text-3xl font-bold">
            Sign in to Workflow
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="space-y-4 rounded-md flex flex-col gap-4">
            <FormField
              id="email"
              type="email"
              label="Email"
              register={register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              error={formErrors.email?.message}
            />
            <FormField
              id="password"
              type="password"
              label="Password"
              register={register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              error={formErrors.password?.message}
            />
          </div>

          <Button type="submit" className="w-full" size="lg">
            Sign in
          </Button>

          {error && (
            <p className="mt-1 text-sm text-red-600 text-center">{error}</p>
          )}

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
