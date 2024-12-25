import { FC } from "react";

import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

interface FormFieldProps {
  id: string;
  type: string;
  register: any;
  label?: string;
  error?: string;
}

export const FormField: FC<FormFieldProps> = ({
  id,
  type,
  register,
  label,
  error,
}) => {
  return (
    <div>
      {label && <Label htmlFor={id} className="mb-2 block">{label}</Label>}
      <Input id={id} type={type} {...register} />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};
