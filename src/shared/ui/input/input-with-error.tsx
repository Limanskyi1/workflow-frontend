import { ComponentProps, forwardRef } from "react";

import { cn } from "@/shared/utils/cn";

import { Input } from "./input";

export const InputWithError = forwardRef<
  HTMLInputElement,
  { error?: string } & ComponentProps<"input">
>(({ error, className, ...props }, ref) => {
  return (
    <div className="input-wrapper">
      <Input
        ref={ref}
        className={cn(className, error ? "border-red-500" : "")}
        {...props}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
});

InputWithError.displayName = "InputWithError";
