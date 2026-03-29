"use client";

import { Input } from "@/components/ui/input";
import { FieldError, UseFormRegister } from "react-hook-form";

type FormInputProps = {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  readonly?: boolean;
  isNumber?: boolean;
};

const FormInput = ({
  label,
  name,
  placeholder,
  type = "text",
  register,
  error,
  readonly = false,
  isNumber = false,
}: FormInputProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>

      <Input
        type="text"
        placeholder={placeholder}
        readOnly={readonly}
        inputMode={isNumber ? "numeric" : undefined}
        {...register(name, {
          setValueAs: (value) => {
            if (!isNumber) return value;
            return value === "" ? undefined : Number(value);
          },
        })}
        onInput={(e) => {
          if (!isNumber) return;
          const target = e.target as HTMLInputElement;
          target.value = target.value.replace(/[^0-9]/g, "");
        }}
      />

      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default FormInput;
