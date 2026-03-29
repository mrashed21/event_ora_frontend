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
  create_category_schema,
  CreateCategoryInput,
} from "@/schemas/category.schema";

import { toast } from "sonner";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const defaultValues: CreateCategoryInput = {
  category_title: "",
  category_type: "public",
  category_description: "",
  category_status: "active",
  is_paid: false,
  category_image: undefined,
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
    defaultValues,
  });

  const handleModalChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      reset(defaultValues);
    }
    onOpenChange(nextOpen);
  };

  const onSubmit = async (data: CreateCategoryInput) => {
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

      const res = await createCategory(formData);

      toast.success(res?.message || "Category created successfully!");

      reset(defaultValues);
      onOpenChange(false);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to create category",
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleModalChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
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
            onChange={(file) =>
              setValue("category_image", file, {
                shouldValidate: true,
              })
            }
            error={errors.category_image?.message as string}
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

          {/* Switches */}
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
              {isPending ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryCreate;
