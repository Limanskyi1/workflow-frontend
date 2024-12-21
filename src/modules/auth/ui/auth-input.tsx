import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { FC } from "react";

interface AuthInputProps {
  id: string;
  type: string;
  label: string;
  register: any;
  error?: string;
}

export const AuthInput: FC<AuthInputProps> = ({
  id,
  type,
  label,
  register,
  error,
}) => {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} {...register} />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};
