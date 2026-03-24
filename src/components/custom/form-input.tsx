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
};

const FormInput = ({
  label,
  name,
  placeholder,
  type = "text",
  register,
  error,
}: FormInputProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>

      <Input type={type} placeholder={placeholder} {...register(name)} />

      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default FormInput;
