import { ComponentProps, forwardRef } from "react";

import { cn } from "@/shared/utils/cn";

import { Label } from "../label";

interface BaseInputProps extends ComponentProps<"input"> {}

interface InputProps extends BaseInputProps {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { label, error, className, type, ...restProps } = props;
  return (
    <div>
      {label && (
        <Label className="mb-2 block" htmlFor={label.toLocaleLowerCase()}>
          {label}
        </Label>
      )}
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...restProps}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
});
Input.displayName = "Input";
