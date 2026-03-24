"use client";

import { AdminInterface } from "@/api/dashboard/admin/all-admin/admin.api";
import TableSkeleton from "@/components/skeleton/table-skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  data: AdminInterface[];
  isLoading?: boolean;
  serial: (index: number) => number;
}

const AdminTable = ({ data, isLoading, serial }: Props) => {
  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div className="rounded-md border bg-white shadow-sm overflow-hidden">
      <Table>
        {/* Header */}
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        {/* Body */}
        <TableBody>
          {data.length > 0 ? (
            data.map((admin, index) => (
              <TableRow key={admin.id}>
                <TableCell className="font-medium">{serial(index)}</TableCell>

                <TableCell>
                  {admin?.profile_photo ? (
                    <img
                      src={admin?.profile_photo}
                      alt={admin.admin_name}
                      className="w-16 h-16"
                    />
                  ) : (
                    "-"
                  )}
                </TableCell>

                <TableCell className="font-medium">
                  {admin.admin_name}
                </TableCell>

                <TableCell>{admin.admin_email}</TableCell>

                <TableCell>
                  <Badge
                    variant={
                      admin.admin_role === "super_admin"
                        ? "default"
                        : "secondary"
                    }
                    className="capitalize"
                  >
                    {admin.admin_role.replace("_", " ")}
                  </Badge>
                </TableCell>

                <TableCell>{admin.contact_number || "—"}</TableCell>

                <TableCell>
                  {new Date(admin.created_at).toLocaleDateString()}
                </TableCell>

                <TableCell className="text-right">
                  <button className="text-sm text-blue-600 hover:underline mr-2">
                    Edit
                  </button>
                  <button className="text-sm text-red-600 hover:underline">
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-10 text-muted-foreground"
              >
                No admins found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminTable;
