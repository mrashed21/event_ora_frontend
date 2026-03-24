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
  category_type: string;
  category_description?: string;
  category_status: "active" | "in_active";
  is_paid: boolean;
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
      category_type: "",
      category_description: "",
      category_status: "active",
      is_paid: true,
    },
  });

  useEffect(() => {
    if (category && open) {
      reset({
        category_type: category.category_type || "",
        category_description: category.category_description || "",
        category_status: category.category_status || "active",
        is_paid: category.is_paid || false,
      });
    }
  }, [category, open, reset]);

  const onSubmit = async (data: CreateCategoryInput) => {
    if (!category?.id) return;

    try {
      const payload = {
        id: category.id,
        category_type: data.category_type || "",
        category_description: data.category_description || "",
        category_status: data.category_status || "active",
        is_paid: data.is_paid || false,
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

          {/* Active + Paid (Same Row) */}
          <div className="grid grid-cols-2 gap-6">
            {/* Active */}
            <div className="flex items-center justify-start gap-3">
              <label className="text-sm font-medium">Active</label>
              <Switch
                checked={watch("category_status") === "active"}
                onCheckedChange={(val) =>
                  setValue("category_status", val ? "active" : "in_active")
                }
                disabled={isPending}
              />
            </div>

            {/* Paid */}
            <div className="flex items-center justify-start gap-3">
              <label className="text-sm font-medium">Paid</label>
              <Switch
                checked={watch("is_paid")}
                onCheckedChange={(val) => setValue("is_paid", val)}
                disabled={isPending}
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
              {isPending ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryUpdate;
