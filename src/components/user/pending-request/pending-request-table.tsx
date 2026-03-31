"use client";

import UpdateRequestModal from "@/components/custom/update-request";
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
import { formatDate, formatTime } from "@/hooks/date-format";
import { CircleCheckBig, XCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface PendingRequestTableProps {
  data: any[];
  isLoading: boolean;
  serial: (index: number) => number;
}

const PendingRequestTable = ({
  data,
  isLoading,
  serial,
}: PendingRequestTableProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [actionType, setActionType] = useState<"approved" | "rejected">(
    "approved",
  );
  const [selected, setSelected] = useState<any>(null);
  if (isLoading) {
    return <TableSkeleton />;
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col h-screen items-center justify-center py-10">
        <p className="text-muted-foreground">No pending requests found.</p>
      </div>
    );
  }
  return (
    <div className="rounded-2xl border shadow-sm">
      <div className="overflow-x-auto rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Event Image</TableHead>
              <TableHead>Event Title</TableHead>
              <TableHead>Fee</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Participation</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Requested</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{serial(index)}</TableCell>
                <TableCell className="font-medium">
                  {item?.user?.name || "N/A"}
                  <p className="text-xs">{item?.user?.email || "N/A"}</p>
                </TableCell>

                <TableCell className="font-medium">
                  <Image
                    src={item?.event?.event_image}
                    alt={item?.event?.event_title || "Event Image"}
                    width={64}
                    height={64}
                    className="w-20 h-20 rounded-md object-cover mb-2"
                  />
                </TableCell>

                <TableCell>
                  <p className="capitalize text-xs">
                    {item?.event?.event_title || "N/A"}
                  </p>
                  <p className="capitalize">
                    {item?.event?.event_venue || "N/A"}
                  </p>
                </TableCell>

                <TableCell>
                  {item?.event?.registration_fee
                    ? `$${item.event.registration_fee}`
                    : "Free"}
                </TableCell>

                <TableCell>
                  {item?.payment?.amount ? `$${item.payment.amount}` : "-"}
                </TableCell>

                <TableCell>
                  <Badge
                    variant="outline"
                    className={`capitalize ${
                      item?.payment_status === "paid"
                        ? "border-green-200 bg-green-50 text-green-700"
                        : item?.payment_status === "not_required"
                          ? "border-blue-200 bg-blue-50 text-blue-700"
                          : "border-yellow-200 bg-yellow-50 text-yellow-700"
                    }`}
                  >
                    {item?.payment_status.replace(/_/g, " ") || "N/A"}
                  </Badge>
                </TableCell>

                <TableCell>
                  <Badge variant={"destructive"} className="capitalize">
                    {item?.participation_status || "N/A"}
                  </Badge>
                </TableCell>

                <TableCell>{formatDate(item?.event?.event_date)}</TableCell>

                <TableCell>{formatTime(item?.event?.event_time)}</TableCell>

                <TableCell>{formatDate(item?.requested_at)}</TableCell>

                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelected(item);
                      setActionType("approved");
                      setModalOpen(true);
                    }}
                  >
                    <CircleCheckBig size={18} />
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      setSelected(item);
                      setActionType("rejected");
                      setModalOpen(true);
                    }}
                  >
                    <XCircle size={18} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selected && (
        <UpdateRequestModal
          open={modalOpen}
          setOpen={setModalOpen}
          participantId={selected.participant_id}
          eventId={selected.event_id}
          type={actionType}
        />
      )}
    </div>
  );
};

export default PendingRequestTable;
