"use client";

import {
  CategoryInterface,
  useDeleteCategory,
} from "@/api/category/category.api";
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

  const [description_modal_open, set_description_modal_open] = useState(false);
  const [selected_description, set_selected_description] = useState("");

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <p>Loading...</p>
      </div>
    );
  }

  const handleDescriptionClick = (description: string) => {
    set_selected_description(description);
    set_description_modal_open(true);
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
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Active </TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        {/* Body */}
        <TableBody>
          {data.length > 0 ? (
            data.map((category, index) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{serial(index)}</TableCell>

                <TableCell className="font-medium">
                  {category.category_name}
                </TableCell>

                <TableCell>
                  <Button
                    variant="outline"
                    onClick={() =>
                      handleDescriptionClick(
                        category.category_description || "",
                      )
                    }
                  >
                    <PanelTopDashed />
                  </Button>
                </TableCell>

                <TableCell>
                  <Badge
                    variant={category.is_active ? "default" : "secondary"}
                    className="capitalize"
                  >
                    {category.is_active ? "Active" : "In Active"}
                  </Badge>
                </TableCell>

                <TableCell>
                  {new Date(category.created_at).toLocaleDateString()}
                </TableCell>

                <TableCell className="text-right flex items-center justify-end gap-2">
                  <Button
                    variant="outline"
                    className="text-sm hover:underline"
                    onClick={() => handleUpdate(category)}
                  >
                    <Pencil />
                  </Button>
                  <Button
                    onClick={() => {
                      handleDelete(category.id);
                    }}
                    variant="destructive"
                    className="text-sm hover:underline"
                  >
                    <Trash2 />
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
        open={description_modal_open}
        onOpenChange={set_description_modal_open}
        description={selected_description}
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Category Description</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <p>{description || "No description provided."}</p>
        </div>
        <div className="flex justify-end p-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
