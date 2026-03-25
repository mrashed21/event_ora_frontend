import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

export type ComboboxOption = {
  label: string;
  value: string;
};

type FormComboboxProps<T extends FieldValues> = {
  name: FieldPath<T>;
  control: Control<T>;
  options: ComboboxOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  rules?: RegisterOptions<T, FieldPath<T>>;
};

const FormCombobox = <T extends FieldValues>({
  name,
  control,
  options,
  placeholder = "Select option",
  searchPlaceholder = "Search...",
  disabled = false,
  rules,
}: FormComboboxProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              disabled={disabled}
              className={cn(
                "w-full justify-between capitalize",
                !field.value && "text-muted-foreground font-normal",
              )}
            >
              {field.value?.label || placeholder}
            </Button>
          </PopoverTrigger>

          <PopoverContent
            align="start"
            className="w-[--radix-popover-trigger-width] p-0"
          >
            <Command>
              <CommandInput placeholder={searchPlaceholder} />
              <CommandEmpty>No option found.</CommandEmpty>

              <CommandGroup>
                {options?.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    className="capitalize"
                    onSelect={() => {
                      field.onChange(option);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        field.value?.value === option.value
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      )}
    />
  );
};

export default FormCombobox;
