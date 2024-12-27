import { ComponentProps, forwardRef } from "react";

import { Label } from "../label";
import { Input } from "./input";

export const InputWithLabel = forwardRef<
  HTMLInputElement,
  { label: string } & ComponentProps<"input">
>(({ label, className, ...props }, ref) => {
  return (
    <div className="input-wrapper">
      <Label>{label}</Label>
      <Input ref={ref} className={className} {...props} />
    </div>
  );
});
InputWithLabel.displayName = "InputWithLabel";
