"use client";

import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

type PasswordInputProps = {
  label: string;
  name: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
};

const PasswordInput = ({
  label,
  name,
  placeholder,
  register,
  error,
}: PasswordInputProps) => {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">{label}</label>

      <div className="relative">
        <Input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          {...register(name)}
          className="pr-10"
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default PasswordInput;
