import { ComponentProps } from "react";

import { Input } from "./input";
import { InputWithError } from "./input-with-error";
import { InputWithLabel } from "./input-with-label";
import { InputWithLabelAndError } from "./input-with-label-and-error";

export type InputFactoryVariants =
  | "error"
  | "label"
  | "labelAndError"
  | "default";

export const InputFactory = ({
  variant,
  options,
  register,
  ...props
}: {
  variant: InputFactoryVariants;
  options?: any;
  register?: any;
} & ComponentProps<"input">) => {
  switch (variant) {
    case "error":
      return (
        <InputWithError
          {...props}
          error={options?.error}
          {...(register || {})}
        />
      );
    case "label":
      return (
        <InputWithLabel
          {...props}
          label={options?.label}
          {...(register || {})}
        />
      );
    case "labelAndError":
      return (
        <InputWithLabelAndError
          {...props}
          error={options?.error}
          label={options?.label}
          register={register}
        />
      );
    case "default":
      return <Input {...props} {...register} />;
    default:
      return <Input {...props} {...register} />;
  }
};
