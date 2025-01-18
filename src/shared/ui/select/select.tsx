import { ReactNode } from "react";

import {
  SelectContent,
  Select as SelectDefault,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./default-select";

interface SelectOption {
  value: string;
  label: string;
  icon?: ReactNode;
}

interface SelectProps<OptionType extends SelectOption> {
  options: OptionType[];
  value?: OptionType;
  className?: string;
  onChange?: (value: OptionType) => void;
}

export const Select = <OptionType extends SelectOption>({
  options,
  value,
  className,
  onChange,
  ...rest 
}: SelectProps<OptionType>) => {

  const defaultValue = value ? value.label : "";

  return (
    <SelectDefault onValueChange={(val) => {
      const selectedOption = options.find((option) => option.value === val);
      if (selectedOption && onChange) {
        onChange(selectedOption);
      }
    }} value={value ? value.value : ""} {...rest}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={defaultValue} />
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

