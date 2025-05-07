import { Eye, EyeClosed } from "lucide-react";
import { ComponentProps, forwardRef, useState } from "react";

import { cn } from "@/shared/utils/cn";

import { Label } from "../label";

interface BaseInputProps extends ComponentProps<"input"> {}

interface InputProps extends BaseInputProps {
  label?: string;
  error?: string;
}

export const InputPassword = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const { label, error, className, ...restProps } = props;
    const [type, setType] = useState<"password" | "text">("password");
    return (
      <div>
        {label && (
          <Label className="mb-2 block" htmlFor={label.toLocaleLowerCase()}>
            {label}
          </Label>
        )}
        <div className="relative">
          <input
            type={type}
            className={cn(
              "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              className,
            )}
            ref={ref}
            {...restProps}
          />
          {type === "password" ? (
            <Eye
              className="absolute right-3 top-[50%] translate-y-[-50%] w-5 h-5 cursor-pointer"
              onClick={() => setType("text")}
            />
          ) : (
            <EyeClosed
              className="absolute right-3 top-[50%] translate-y-[-50%] w-5 h-5 cursor-pointer"
              onClick={() => setType("password")}
            />
          )}
        </div>

        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    );
  },
);
InputPassword.displayName = "Input";
