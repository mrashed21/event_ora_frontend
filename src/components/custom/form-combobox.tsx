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
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

export type ComboboxOption = {
  label: string;
  id: string;
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
  const [open, setOpen] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => {
        const selectedOption = options.find(
          (option) => option.id === field.value,
        );

        return (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                role="combobox"
                disabled={disabled}
                className={cn(
                  "w-full justify-between capitalize",
                  !field.value && "text-muted-foreground font-normal",
                )}
              >
                <span className="truncate">
                  {selectedOption?.label || placeholder}
                </span>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
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
                      key={option.id}
                      value={option.label}
                      className="capitalize"
                      onSelect={() => {
                        field.onChange(option.id); 
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          field.value === option.id
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
        );
      }}
    />
  );
};

export default FormCombobox;
