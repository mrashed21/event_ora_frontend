"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import FormInput from "@/components/custom/form-input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import {
  create_category_schema,
  CreateCategoryInput,
} from "@/schemas/category.schema";

import { useUpdateCategory } from "@/api/category/category.api";
import { toast } from "sonner";

type Category = {
  id: string;
  category_name: string;
  category_description?: string;
  is_active: boolean;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: Category | null;
};

const CategoryUpdate = ({ open, onOpenChange, category }: Props) => {
  const { mutateAsync: updateCategory, isPending } = useUpdateCategory();

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
      category_name: "",
      category_description: "",
      is_active: true,
    },
  });

  useEffect(() => {
    if (category && open) {
      reset({
        category_name: category.category_name,
        category_description: category.category_description || "",
        is_active: category.is_active,
      });
    }
  }, [category, open, reset]);

  const onSubmit = async (data: CreateCategoryInput) => {
    if (!category?.id) return;

    try {
      const payload = {
        id: category.id,
        category_name: data.category_name,
        category_description: data.category_description || "",
        is_active: data.is_active ?? true,
      };

      const res = await updateCategory(payload);

      toast.success(res?.message || "Category updated successfully!");

      reset();
      onOpenChange(false);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to update category",
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Category</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Category Name */}
          <FormInput
            label="Category Name"
            name="category_name"
            placeholder="Enter category name"
            register={register}
            error={errors.category_name}
          />

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              placeholder="Optional description"
              {...register("category_description")}
            />
            {errors.category_description && (
              <p className="text-sm text-red-500">
                {errors.category_description.message}
              </p>
            )}
          </div>

          {/* Active Switch */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Active</label>
            <Switch
              checked={watch("is_active")}
              onCheckedChange={(val) => setValue("is_active", val)}
              disabled={isPending}
            />
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
              {isPending ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryUpdate;
