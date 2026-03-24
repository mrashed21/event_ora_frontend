"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const rows = Array.from({ length: 6 });

const TableSkeleton = () => {
  return (
    <div className="rounded-md border bg-white shadow-sm overflow-hidden">
      <Table>
        {/* Header */}
        <TableHeader>
          <TableRow>
            <TableCell>
              <Skeleton className="h-4 w-10" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-28" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-28" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-28" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-28" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-28" />
            </TableCell>
            <TableCell className="text-right">
              <Skeleton className="h-4 w-16 ml-auto" />
            </TableCell>
          </TableRow>
        </TableHeader>

        {/* Body */}
        <TableBody>
          {rows.map((_, i) => (
            <TableRow key={i}>
              {/* Serial */}
              <TableCell>
                <Skeleton className="h-4 w-8" />
              </TableCell>

              {/* Category */}
              <TableCell>
                <Skeleton className="h-4 w-32" />
              </TableCell>

              {/* Description button */}
              <TableCell>
                <Skeleton className="h-4 w-32" />
              </TableCell>

              {/* Status  */}
              <TableCell>
                <Skeleton className="h-4 w-32" />
              </TableCell>

              {/*  Paid */}
              <TableCell>
                <Skeleton className="h-4 w-32" />
              </TableCell>
              {/* Date */}
              <TableCell>
                <Skeleton className="h-4 w-32" />
              </TableCell>

              {/* Actions */}
              <TableCell className="flex justify-end gap-2">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Skeleton */}
      <div className="flex items-center justify-end px-4 py-3 border-t">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default TableSkeleton;
