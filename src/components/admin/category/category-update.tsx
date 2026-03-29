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

import { useUpdateCategory } from "@/api/category/category.api";
import FileUpload from "@/components/custom/file-upload";
import FormInput from "@/components/custom/form-input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import {
  update_category_schema,
  UpdateCategoryInput,
} from "@/schemas/category.schema";

import { toast } from "sonner";

type Category = {
  id: string;
  category_title: string;
  category_type: "public" | "private";
  category_description?: string | null;
  category_image?: string | null;
  category_status: "active" | "in_active";
  is_paid: boolean;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: Category | null;
};

const defaultValues: UpdateCategoryInput = {
  id: "",
  category_title: "",
  category_type: "public",
  category_description: "",
  category_status: "active",
  is_paid: false,
  category_image: undefined,
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
  } = useForm<UpdateCategoryInput>({
    resolver: zodResolver(update_category_schema),
    defaultValues,
  });

  useEffect(() => {
    if (category && open) {
      reset({
        id: category.id,
        category_title: category.category_title || "",
        category_type: category.category_type || "public",
        category_description: category.category_description || "",
        category_status: category.category_status || "active",
        is_paid: category.is_paid ?? false,
        category_image: undefined,
      });
    }
  }, [category, open, reset]);

  const handleModalChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      reset(defaultValues);
    }
    onOpenChange(nextOpen);
  };

  const onSubmit = async (data: UpdateCategoryInput) => {
    if (!category?.id) return;

    try {
      const formData = new FormData();

      formData.append("category_title", data.category_title);
      formData.append("category_type", data.category_type);
      formData.append("category_description", data.category_description || "");
      formData.append("category_status", data.category_status);
      formData.append("is_paid", String(data.is_paid));

      if (data.category_image instanceof File) {
        formData.append("category_image", data.category_image);
      }

      const res = await updateCategory({
        id: category.id,
        payload: formData,
      });

      toast.success(res?.message || "Category updated successfully!");

      reset(defaultValues);
      onOpenChange(false);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to update category",
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleModalChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Category</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Category Title */}
          <FormInput
            label="Category Title"
            name="category_title"
            placeholder="Enter category title"
            register={register}
            error={errors.category_title}
          />

          {/* Category Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Category Type</label>
            <Select
              value={watch("category_type")}
              onValueChange={(value) =>
                setValue("category_type", value as "public" | "private", {
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
              </SelectContent>
            </Select>

            {errors.category_type && (
              <p className="text-sm text-red-500">
                {errors.category_type.message}
              </p>
            )}
          </div>

          {/* File Upload */}
          <FileUpload
            label="Category Image"
            value={watch("category_image") || null}
            onChange={(file) =>
              setValue("category_image", file, {
                shouldValidate: true,
              })
            }
            error={errors.category_image?.message as string}
          />

          {/* Existing Image Preview */}
          {category?.category_image && !watch("category_image") && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Current Image</label>
              <img
                src={category.category_image}
                alt={category.category_title}
                className="h-20 w-20 rounded-md border object-cover"
              />
            </div>
          )}

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

          {/* Active + Paid */}
          <div className="grid grid-cols-2 gap-6">
            {/* Active */}
            <div className="flex items-center justify-start gap-3">
              <label className="text-sm font-medium">Active</label>
              <Switch
                checked={watch("category_status") === "active"}
                onCheckedChange={(val) =>
                  setValue("category_status", val ? "active" : "in_active", {
                    shouldValidate: true,
                  })
                }
                disabled={isPending}
              />
            </div>

            {/* Paid */}
            <div className="flex items-center justify-start gap-3">
              <label className="text-sm font-medium">Paid</label>
              <Switch
                checked={watch("is_paid")}
                onCheckedChange={(val) =>
                  setValue("is_paid", val, {
                    shouldValidate: true,
                  })
                }
                disabled={isPending}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleModalChange(false)}
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
