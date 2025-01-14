import { ReactNode } from "react";

import {
  SelectContent,
  Select as SelectDefault,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./default-select";

interface SelectProps {
  options: {
    value: string;
    label: string;
    icon?: ReactNode;
  }[];
  defaultValue: {
    value: string;
    label: string;
    icon?: ReactNode;
  };
  className?: string;
}

export const Select = ({ options, defaultValue, className }: SelectProps) => {
  return (
    <SelectDefault>
      <SelectTrigger className={className}>
        <SelectValue placeholder={defaultValue.label} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option, index) => (
            <SelectItem key={index} value={option.value}>
              <div className="flex items-center gap-2">
                {option.icon ? option.icon : null} {option.label}
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </SelectDefault>
  );
};
