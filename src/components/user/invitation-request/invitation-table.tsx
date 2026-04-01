"use client";

import {
  useUpdateInvitationStatus,
  type InvitationItem,
} from "@/api/invaitaion/invaitation.api";
import TableSkeleton from "@/components/skeleton/table-skeleton";
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
import Image from "next/image";
import { toast } from "sonner";

type Props = {
  data: InvitationItem[];
  isLoading: boolean;
};

const getStatusVariant = (status: string) => {
  switch (status) {
    case "accepted":
      return "default";
    case "rejected":
      return "destructive";
    default:
      return "secondary";
  }
};

const MyInvitationTable = ({ data, isLoading }: Props) => {
  const { mutateAsync, isPending } = useUpdateInvitationStatus();

  if (isLoading) {
    return <TableSkeleton />;
  }

  const handleAction = async (id: string, action: "ACCEPT" | "REJECT") => {
    try {
      const res = await mutateAsync({ id, action });
      toast.success(res?.message || `Invitation ${action.toLowerCase()}ed`);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <section className="rounded-md border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event</TableHead>
              <TableHead>Organizer</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Invitation Date</TableHead>
              <TableHead>Event Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="capitalize">
            {data?.length > 0 ? (
              data.map((item) => (
                <TableRow key={item.id}>
                  {/* Event */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-16 overflow-hidden rounded-md border bg-gray-100">
                        {item.event?.event_image ? (
                          <Image
                            src={item.event.event_image}
                            alt={item.event.event_title}
                            fill
                            className="object-cover"
                          />
                        ) : null}
                      </div>

                      <div>
                        <p className="font-medium text-gray-900">
                          {item.event?.event_title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.event?.event_venue}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Organizer */}
                  <TableCell>
                    <div>
                      <p className="font-medium">
                        {item.event?.organizer?.user_name || "N/A"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.event?.organizer?.user_email || item.email}
                      </p>
                    </div>
                  </TableCell>

                  {/* Category */}
                  <TableCell>
                    <div>
                      <p className="font-medium">
                        {item.event?.category?.category_title || "N/A"}
                      </p>
                      <p className="text-sm capitalize text-muted-foreground">
                        {item.event?.category?.category_type || "N/A"}
                      </p>
                    </div>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Badge variant={getStatusVariant(item.status)}>
                      {item.status}
                    </Badge>
                  </TableCell>

                  {/* Invitation Date */}
                  <TableCell>{formatDate(item.created_at)}</TableCell>

                  {/* Event Date */}
                  <TableCell>
                    <div>
                      <p>{formatDate(item.event?.event_date)}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.event?.event_time}
                      </p>
                    </div>
                  </TableCell>

                  {/* Action */}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleAction(item.id, "ACCEPT")}
                        disabled={
                          isPending ||
                          item.status === "accepted" ||
                          item.status === "rejected"
                        }
                      >
                        {(item.status === "pending" && "Accept") ||
                          (item.status === "accepted" && "Accepted")}
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleAction(item.id, "REJECT")}
                        disabled={
                          isPending ||
                          item.status === "accepted" ||
                          item.status === "rejected"
                        }
                      >
                        {item.status === "pending"
                          ? "Reject"
                          : item.status === "rejected"
                            ? "Rejected"
                            : "Reject"}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="py-10 text-center text-muted-foreground"
                >
                  No invitations found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default MyInvitationTable;
