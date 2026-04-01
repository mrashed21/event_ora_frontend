"use client";

import TableSkeleton from "@/components/skeleton/table-skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/hooks/date-format";
import { Trash2 } from "lucide-react";

export interface UserItem {
  id: string;
  name: string;
  email: string;
  image: string | null;
  user_role: "user" | "admin";
  user_status: "active" | "inactive";
  emailVerified: boolean;
  is_deleted: boolean;
  need_password_change: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

const getStatusVariant = (status: string) => {
  switch (status?.toLowerCase()) {
    case "active":
      return "default";
    case "inactive":
      return "secondary";
    default:
      return "outline";
  }
};

const getRoleVariant = (role: string) => {
  switch (role?.toLowerCase()) {
    case "admin":
      return "destructive";
    case "user":
      return "secondary";
    default:
      return "outline";
  }
};

const UserTable = ({
  data,
  isLoading,
  serial,
}: {
  data: UserItem[];
  isLoading: boolean;
  serial: (index: number) => number;
}) => {
  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead className="">#</TableHead>
              <TableHead className="min-w-60">User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Email Verified</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.length > 0 ? (
              data.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell>{serial(index)}</TableCell>
                  {/* User Info */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.image || ""} alt={user.name} />
                        <AvatarFallback>
                          {user.name?.slice(0, 2).toUpperCase() || "NA"}
                        </AvatarFallback>
                      </Avatar>

                      <div className="space-y-1">
                        <p className="font-medium leading-none">{user.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Role */}
                  <TableCell className="capitalize">
                    <Badge variant={getRoleVariant(user.user_role)}>
                      {user.user_role}
                    </Badge>
                  </TableCell>

                  {/* Status */}
                  <TableCell className="capitalize">
                    <Badge variant={getStatusVariant(user.user_status)}>
                      {user.user_status}
                    </Badge>
                  </TableCell>

                  {/* Email Verified */}
                  <TableCell>
                    <Badge
                      variant={user.emailVerified ? "default" : "secondary"}
                    >
                      {user.emailVerified ? "Verified" : "Not Verified"}
                    </Badge>
                  </TableCell>

                  {/* Created At */}
                  <TableCell>
                    {user.createdAt ? formatDate(user.createdAt) : "N/A"}
                  </TableCell>

                  {/* Actions */}
                  <TableCell>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-24 text-center text-muted-foreground"
                >
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserTable;
