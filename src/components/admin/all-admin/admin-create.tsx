"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useCreateAdmin } from "@/api/dashboard/admin/all-admin/admin.api";
import FileUpload from "@/components/custom/file-upload";
import FormInput from "@/components/custom/form-input";
import PasswordInput from "@/components/custom/password-input";
import { create_admin_schema } from "@/schemas/admin.schema";
import { toast } from "sonner";

type FormData = z.infer<typeof create_admin_schema>;

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const AdminCreate = ({ open, onOpenChange }: Props) => {
  const { mutateAsync: cretateAdmin } = useCreateAdmin();

  const [file, setFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(create_admin_schema),
    defaultValues: {
      admin_role: "admin",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const formData = new FormData();

      formData.append("admin_name", data.admin_name);
      formData.append("admin_email", data.admin_email);
      formData.append("admin_password", data.admin_password);
      formData.append("admin_role", data.admin_role);

      if (data.contact_number) {
        formData.append("contact_number", data.contact_number);
      }
      if (file) {
        formData.append("file", file);
      }

      const res = await cretateAdmin(formData);
      reset();
      toast.success(res?.message || "Admin created successfully!");
      setFile(null);
      onOpenChange(false);
    } catch (err: any) {
      const message = err?.response?.data?.message || "Admin created failed";
      toast.error(message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Admin</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            label="Name"
            name="admin_name"
            placeholder="Enter name"
            register={register}
            error={errors.admin_name}
          />

          <FormInput
            label="Email"
            name="admin_email"
            placeholder="Enter email"
            register={register}
            error={errors.admin_email}
          />

          <PasswordInput
            label="Password"
            name="admin_password"
            placeholder="Enter password"
            register={register}
            error={errors.admin_password}
          />

          {/* Role */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Role</label>
            <Select
              defaultValue="ADMIN"
              onValueChange={(value) =>
                setValue("admin_role", value as FormData["admin_role"])
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="super_admin">Super Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* File Upload */}
          <FileUpload
            label="Profile Photo"
            onChange={setFile}
            error={errors.profile_photo?.message as string}
          />

          <FormInput
            label="Contact Number"
            name="contact_number"
            placeholder="Enter contact number"
            register={register}
            error={errors.contact_number}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Admin"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminCreate;
