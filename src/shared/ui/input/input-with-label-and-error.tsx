import { Label } from "@radix-ui/react-label";

import { ComponentProps, forwardRef } from "react";

import { cn } from "@/shared/utils/cn";

import { Input } from "./input";

export const InputWithLabelAndError = forwardRef<
  HTMLInputElement,
  { label: string; error?: string; register?: any } & ComponentProps<"input">
>(({ label, error, className, register, ...props }, ref) => {
  return (
    <div className="input-wrapper">
      <Label className="mb-2 block">{label}</Label>
      <Input
        ref={ref}
        className={cn(className)}
        {...(register || {})}
        {...props}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
});

InputWithLabelAndError.displayName = "InputWithLabelAndError";
