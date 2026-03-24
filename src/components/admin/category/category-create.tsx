"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useCreateCategory } from "@/api/category/category.api";
import FormInput from "@/components/custom/form-input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import {
  create_category_schema,
  CreateCategoryInput,
} from "@/schemas/category.schema";

import { toast } from "sonner";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const CategoryCreate = ({ open, onOpenChange }: Props) => {
  const { mutateAsync: createCategory, isPending } = useCreateCategory();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<CreateCategoryInput>({
    resolver: zodResolver(create_category_schema),
    defaultValues: {
      category_type: "",
      category_description: "",
      category_status: "active",
      is_paid: true,
    },
  });

  const onSubmit = async (data: CreateCategoryInput) => {
    try {
      const payload = {
        category_type: data.category_type,
        category_description: data.category_description || "",
        category_status: data.category_status,
        is_paid: data.is_paid,
      };

      const res = await createCategory(payload);

      toast.success(res?.message || "Category created successfully!");

      reset();
      onOpenChange(false);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to create category",
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Category Type */}
          <FormInput
            label="Category Type"
            name="category_type"
            placeholder="Enter category type"
            register={register}
            error={errors.category_type}
          />

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              placeholder="Optional description"
              {...register("category_description")}
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            {/* Active */}
            <div className="flex items-center justify-start gap-3">
              <label className="text-sm font-medium">Active</label>
              <Switch
                checked={watch("category_status") === "active"}
                onCheckedChange={(val) =>
                  setValue("category_status", val ? "active" : "in_active")
                }
              />
            </div>

            {/* Paid */}
            <div className="flex items-center justify-start gap-3">
              <label className="text-sm font-medium">Paid</label>
              <Switch
                // checked={watch("is_paid")}
                onCheckedChange={(val) => setValue("is_paid", val)}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryCreate;
