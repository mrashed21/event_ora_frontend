"use client";

import { Loader2, PanelTopDashed, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

import {
  CategoryInterface,
  useDeleteCategory,
} from "@/api/category/category.api";

import TableSkeleton from "@/components/skeleton/table-skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import DescriptionModal from "@/components/custom/description-modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/hooks/date-format";

interface Props {
  data: CategoryInterface[];
  isLoading?: boolean;
  serial: (index: number) => number;
  handleUpdate: (item: CategoryInterface) => void;
}

const CategoryTable = ({ data, isLoading, serial, handleUpdate }: Props) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [descriptionModalOpen, setDescriptionModalOpen] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState("");

  const { mutateAsync: deleteCategory, isPending: isDeleting } =
    useDeleteCategory();

  if (isLoading) {
    return <TableSkeleton />;
  }

  const handleDescriptionClick = (description: string) => {
    setSelectedDescription(description);
    setDescriptionModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Deleting category...");
    setDeletingId(id);

    try {
      const res = await deleteCategory(id);

      toast.success(res?.message || "Category deleted successfully!", {
        id: toastId,
      });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to delete category",
        {
          id: toastId,
        },
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <Table>
        {/* Header */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-15">#</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Pricing</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        {/* Body */}
        <TableBody>
          {data?.length > 0 ? (
            data?.map((category, index) => (
              <TableRow key={category?.id}>
                {/* Serial */}
                <TableCell className="font-medium">{serial(index)}</TableCell>

                {/* Category Info */}

                <TableCell>
                  <div className="flex items-center justify-center gap-3">
                    <div className="relative h-11 w-11 overflow-hidden rounded-lg border bg-muted">
                      {category?.category_image ? (
                        <Image
                          src={category?.category_image}
                          alt={category?.category_title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                          N/A
                        </div>
                      )}
                    </div>
                  </div>
                </TableCell>

                <TableCell className="capitalize">
                  {category?.category_title}
                </TableCell>

                {/* Category Type */}
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {category?.category_type}
                  </Badge>
                </TableCell>

                {/* Pricing */}
                <TableCell>
                  <Badge
                    variant={category?.is_paid ? "default" : "secondary"}
                    className="capitalize"
                  >
                    {category?.is_paid ? "Paid" : "Free"}
                  </Badge>
                </TableCell>

                {/* Description */}
                <TableCell>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      handleDescriptionClick(
                        category?.category_description || "",
                      )
                    }
                  >
                    <PanelTopDashed className="h-4 w-4" />
                  </Button>
                </TableCell>

                {/* Status */}
                <TableCell>
                  <Badge
                    variant={
                      category.category_status === "active"
                        ? "default"
                        : "secondary"
                    }
                    className="capitalize"
                  >
                    {category.category_status === "active"
                      ? "Active"
                      : "Inactive"}
                  </Badge>
                </TableCell>

                {/* Created */}
                <TableCell>{formatDate(category.created_at)}</TableCell>

                {/* Actions */}
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleUpdate(category)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          disabled={deletingId === category?.id}
                          variant="destructive"
                          size="icon"
                        >
                          {deletingId === category?.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </Button>
                      </AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Delete this category?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete{" "}
                            <span className="font-medium text-foreground">
                              {" "}
                              {category?.category_title}
                            </span>
                            .
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(category?.id)}
                            disabled={isDeleting}
                          >
                            {isDeleting ? "Deleting..." : "Delete"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={8}
                className="py-12 text-center text-muted-foreground"
              >
                No categories found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Description Modal */}
      <DescriptionModal
        open={descriptionModalOpen}
        onOpenChange={setDescriptionModalOpen}
        description={selectedDescription}
      />
    </div>
  );
};

export default CategoryTable;
