"use client";

import {
  EventInterface,
  useDeleteEvent,
  useUpdateEvent,
} from "@/api/event/event.api";
import TableSkeleton from "@/components/skeleton/table-skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { Loader2, PanelTopDashed, Star, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import DescriptionModal from "../custom/description-modal";

interface Props {
  data: EventInterface[];
  isLoading?: boolean;
  serial: (index: number) => number;
}

const AllEventTable = ({ data, isLoading, serial }: Props) => {
  const { mutateAsync: deleteEvent } = useDeleteEvent();
  const { mutateAsync: updateEvent } = useUpdateEvent();

  const [descriptionModalOpen, setDescriptionModalOpen] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState("");

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventInterface | null>(
    null,
  );

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

  const openUpdateConfirm = (event: EventInterface) => {
    setSelectedEvent(event);
    setConfirmOpen(true);
  };

  const handleConfirmUpdate = async () => {
    if (!selectedEvent) return;

    setUpdatingId(selectedEvent.id);

    try {
      const formData = new FormData();
      formData.append("is_featured", String(!selectedEvent.is_featured));

      const payload = {
        formData,
        id: selectedEvent.id,
      };

      const res = await updateEvent(payload);

      toast.success(
        res?.message ||
          `Event ${
            selectedEvent.is_featured ? "removed from featured" : "featured"
          } successfully!`,
      );

      setConfirmOpen(false);
      setSelectedEvent(null);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update event");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <section className="relative w-full rounded-lg border shadow-md bg-white">
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Venue</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Fee</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Organizer</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length > 0 ? (
              data.map((event, index) => {
                const isPaid = event?.category?.is_paid === true;
                const categoryTitle = event?.category?.category_title || "—";
                const categoryType = event?.category?.category_type || "—";

                return (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">
                      {serial(index)}
                    </TableCell>

                    {/* Image */}
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

                    {/* Title */}
                    <TableCell>
                      <div className="font-medium line-clamp-1 max-w-45">
                        {event.event_title}
                      </div>
                    </TableCell>

                    {/* Description */}
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

                    {/* Venue */}
                    <TableCell>
                      <div className="line-clamp-1 max-w-35">
                        {event.event_venue || "—"}
                      </div>
                    </TableCell>

                    {/* Date + Time */}
                    <TableCell>
                      <div>{formatDate(event.event_date)}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatTime(event.event_time) || "—"}
                      </div>
                    </TableCell>

                    {/* Category */}
                    <TableCell>
                      <div className="font-medium capitalize">
                        {categoryTitle}
                      </div>
                      <div className="text-xs text-muted-foreground capitalize">
                        {categoryType}
                      </div>
                    </TableCell>

                    {/* Fee */}
                    <TableCell>
                      {isPaid ? (
                        <div>
                          <span className="font-medium">
                            ৳ {event.registration_fee ?? 0}
                          </span>
                          <div className="text-xs text-muted-foreground">
                            Paid
                          </div>
                        </div>
                      ) : (
                        <Badge variant="secondary">Free</Badge>
                      )}
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <Badge
                        variant={
                          event.event_status === "active"
                            ? "default"
                            : "secondary"
                        }
                        className="capitalize"
                      >
                        {event.event_status?.replace("_", " ") || "—"}
                      </Badge>
                    </TableCell>

                    {/* Featured */}
                    <TableCell>
                      {event.is_featured ? (
                        <Badge className="gap-1 bg-amber-500 hover:bg-amber-500 text-white">
                          <Star className="w-3.5 h-3.5 fill-white" />
                          Featured
                        </Badge>
                      ) : (
                        <Badge variant="outline">No</Badge>
                      )}
                    </TableCell>

                    {/* Joined */}
                    <TableCell>{event.total_joined ?? 0}</TableCell>

                    {/* Organizer */}
                    <TableCell>
                      <div className="font-medium line-clamp-1 max-w-45">
                        {event.user?.name || "—"}
                      </div>
                      <div className="text-sm text-muted-foreground line-clamp-1 max-w-45">
                        {event.user?.email || "—"}
                      </div>
                    </TableCell>

                    {/* Created At */}
                    <TableCell>{formatDate(event.created_at)}</TableCell>

                    {/* Actions */}
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant={event.is_featured ? "secondary" : "outline"}
                          size="icon"
                          onClick={() => openUpdateConfirm(event)}
                          disabled={
                            deletingId === event.id || updatingId === event.id
                          }
                          title={
                            event.is_featured
                              ? "Remove from featured"
                              : "Make featured"
                          }
                        >
                          {updatingId === event.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Star className="w-4 h-4" />
                          )}
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
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={14}
                  className="py-10 text-center text-muted-foreground"
                >
                  No events found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DescriptionModal
        open={descriptionModalOpen}
        onOpenChange={setDescriptionModalOpen}
        description={selectedDescription}
      />

      {/* FEATURE TOGGLE CONFIRM */}
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {selectedEvent?.is_featured
                ? "Remove featured event?"
                : "Make this event featured?"}
            </AlertDialogTitle>

            <AlertDialogDescription>
              {selectedEvent?.is_featured
                ? "This event will be removed from the featured list."
                : "This event will be marked as featured and highlighted in the system."}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={!!updatingId}>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleConfirmUpdate();
              }}
              disabled={!!updatingId}
            >
              {updatingId ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : selectedEvent?.is_featured ? (
                "Remove Featured"
              ) : (
                "Confirm"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default AllEventTable;
