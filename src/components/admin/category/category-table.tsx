"use client";

import {
  CategoryInterface,
  useDeleteCategory,
} from "@/api/category/category.api";
import TableSkeleton from "@/components/skeleton/table-skeleton";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { PanelTopDashed, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  data: CategoryInterface[];
  isLoading?: boolean;
  serial: (index: number) => number;
  handleUpdate: (item: CategoryInterface) => void;
}

const CategoryTable = ({ data, isLoading, serial, handleUpdate }: Props) => {
  const { mutateAsync: deleteCategory } = useDeleteCategory();

  const [descriptionModalOpen, setDescriptionModalOpen] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState("");

  if (isLoading) {
    return <TableSkeleton />;
  }

  const handleDescriptionClick = (description: string) => {
    setSelectedDescription(description);
    setDescriptionModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteCategory(id);
      toast.success(res?.message || "Category deleted successfully!");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to delete category",
      );
    }
  };

  return (
    <div className="rounded-md border bg-white shadow-sm overflow-hidden">
      <Table>
        {/* Header */}
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        {/* Body */}
        <TableBody>
          {data.length > 0 ? (
            data.map((category, index) => (
              <TableRow key={category.id}>
                {/* Serial */}
                <TableCell className="font-medium">{serial(index)}</TableCell>

                {/* Category Type */}
                <TableCell className="font-medium capitalize">
                  {category.category_type}
                </TableCell>

                {/* Description */}
                <TableCell>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      handleDescriptionClick(
                        category.category_description || "",
                      )
                    }
                  >
                    <PanelTopDashed className="w-4 h-4" />
                  </Button>
                </TableCell>

                <TableCell>
                  <Badge
                    variant={category.is_paid ? "default" : "outline"}
                    className="capitalize"
                  >
                    {category.is_paid ? "Paid" : "Free"}
                  </Badge>
                </TableCell>

                {/* Status  */}
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
                <TableCell>
                  {new Date(category.created_at).toLocaleDateString()}
                </TableCell>

                {/* Actions */}
                <TableCell className="text-right flex items-center justify-end gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleUpdate(category)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>

                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(category.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-10 text-muted-foreground"
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

const DescriptionModal = ({
  open,
  onOpenChange,
  description,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  description: string;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Category Description</DialogTitle>
        </DialogHeader>

        <div className="p-4 text-sm text-muted-foreground capitalize">
          {description || "No description provided."}
        </div>

        <div className="flex justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
