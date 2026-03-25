"use client";

import { EventInterface, useDeleteEvent } from "@/api/event/event.api";
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
import { Loader2, PanelTopDashed, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import DescriptionModal from "../custom/description-modal";

interface Props {
  data: EventInterface[];
  isLoading?: boolean;
  serial: (index: number) => number;
  handleUpdate: (item: EventInterface) => void;
}

const EventTable = ({ data, isLoading, serial, handleUpdate }: Props) => {
  const { mutateAsync: deleteEvent } = useDeleteEvent();

  const [descriptionModalOpen, setDescriptionModalOpen] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  if (isLoading) {
    return <TableSkeleton />;
  }

  const handleDescriptionClick = (description: string) => {
    setSelectedDescription(description);
    setDescriptionModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Deleting event...");
    setDeletingId(id);

    try {
      const res = await deleteEvent(id);

      toast.success(res?.message || "Event deleted successfully!", {
        id: toastId,
      });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete event", {
        id: toastId,
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Venue</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Fee</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead>Created By</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length > 0 ? (
            data.map((event, index) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">{serial(index)}</TableCell>

                <TableCell>
                  {event?.event_image ? (
                    <img
                      src={event.event_image}
                      alt={event.event_title}
                      className="h-14 w-14 rounded-md object-cover border"
                    />
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-md border text-xs text-muted-foreground">
                      No Image
                    </div>
                  )}
                </TableCell>

                <TableCell>{event.event_title}</TableCell>

                <TableCell>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      handleDescriptionClick(event.event_description || "")
                    }
                  >
                    <PanelTopDashed className="w-4 h-4" />
                  </Button>
                </TableCell>

                <TableCell>{event.event_venue || "—"}</TableCell>

                <TableCell>
                  <div>{formatDate(event.event_date)}</div>
                  <div className="text-sm text-muted-foreground">
                    {formatTime(event.event_time) || "—"}
                  </div>
                </TableCell>

                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {event.event_type}
                  </Badge>
                </TableCell>

                <TableCell>
                  {event.is_paid ? (
                    <div>
                      <span className="font-medium">
                        ৳ {event.registration_fee}
                      </span>
                      <div className="text-xs text-muted-foreground">Paid</div>
                    </div>
                  ) : (
                    <Badge variant="secondary">Free</Badge>
                  )}
                </TableCell>

                <TableCell>
                  <Badge
                    variant={
                      event.event_status === "active" ? "default" : "secondary"
                    }
                    className="capitalize"
                  >
                    {event.event_status.replace("_", " ")}
                  </Badge>
                </TableCell>

                <TableCell>{event.total_joined ?? 0}</TableCell>

                <TableCell>
                  <div className="font-medium">{event.user?.name || "—"}</div>
                  <div className="text-sm text-muted-foreground">
                    {event.user?.email || "—"}
                  </div>
                </TableCell>

                <TableCell>{formatDate(event.created_at)}</TableCell>

                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleUpdate(event)}
                      disabled={deletingId === event.id}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>

                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(event.id)}
                      disabled={deletingId === event.id}
                    >
                      {deletingId === event.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={13}
                className="py-10 text-center text-muted-foreground"
              >
                No events found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <DescriptionModal
        open={descriptionModalOpen}
        onOpenChange={setDescriptionModalOpen}
        description={selectedDescription}
      />
    </div>
  );
};

export default EventTable;
