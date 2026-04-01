"use client";

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
import { format } from "date-fns";
import Image from "next/image";
import { useState } from "react";
import ReviewModal from "../review/review-modal";

const getStatusVariant = (status: string) => {
  switch (status?.toLowerCase()) {
    case "approved":
      return "default";
    case "pending":
      return "secondary";
    case "rejected":
      return "destructive";
    default:
      return "outline";
  }
};

const getPaymentVariant = (status: string) => {
  switch (status?.toLowerCase()) {
    case "paid":
      return "default";
    case "unpaid":
      return "destructive";
    case "pending":
      return "secondary";
    default:
      return "outline";
  }
};

const JoinRequestTable = ({
  data,
  isLoading,
}: {
  data: any[];
  isLoading: boolean;
}) => {
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [selectedReviewData, setSelectedReviewData] = useState<any | null>(
    null,
  );

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <>
      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead className="min-w-65">Event</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Venue</TableHead>
                <TableHead>Fee</TableHead>
                <TableHead>Participation</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Organizer</TableHead>
                <TableHead>Requested At</TableHead>
                <TableHead>Review</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="capitalize">
              {data?.length > 0 ? (
                data.map((item) => (
                  <TableRow key={item.id}>
                    {/* Event */}
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative h-14 w-20 overflow-hidden rounded-md border bg-muted">
                          {item?.event?.event_image ? (
                            <Image
                              src={item.event.event_image}
                              alt={item.event.event_title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                              No Image
                            </div>
                          )}
                        </div>

                        <div className="space-y-1">
                          <p className="font-medium leading-none">
                            {item?.event?.event_title || "N/A"}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Category */}
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium">
                          {item?.event?.category?.category_title || "N/A"}
                        </p>
                        <p className="text-xs capitalize text-muted-foreground">
                          {item?.event?.category?.category_type || "N/A"}
                        </p>
                      </div>
                    </TableCell>

                    {/* Date */}
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium">
                          {item?.event?.event_date
                            ? format(
                                new Date(item.event.event_date),
                                "dd MMM yyyy",
                              )
                            : "N/A"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item?.event?.event_time || "N/A"}
                        </p>
                      </div>
                    </TableCell>

                    {/* Venue */}
                    <TableCell>{item?.event?.event_venue || "N/A"}</TableCell>

                    {/* Fee */}
                    <TableCell>
                      {item?.event?.registration_fee
                        ? `$${item.event.registration_fee}`
                        : "Free"}
                    </TableCell>

                    {/* Participation */}
                    <TableCell>
                      <Badge
                        variant={getStatusVariant(item.participation_status)}
                      >
                        {item.participation_status || "Unknown"}
                      </Badge>

                      {item?.replay_note && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          {item.replay_note}
                        </p>
                      )}
                    </TableCell>

                    {/* Payment */}
                    <TableCell>
                      <div className="space-y-1">
                        <Badge variant={getPaymentVariant(item.payment_status)}>
                          {item.payment_status?.replace("_", " ") || "Unknown"}
                        </Badge>

                        {item?.payment?.amount ? (
                          <p className="text-xs text-muted-foreground">
                            {item.payment.amount}{" "}
                            {item.payment.currency?.toUpperCase()}
                          </p>
                        ) : null}
                      </div>
                    </TableCell>

                    {/* Organizer */}
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium">
                          {item?.event?.organizer?.user_name || "N/A"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item?.event?.organizer?.user_email || "N/A"}
                        </p>
                      </div>
                    </TableCell>

                    {/* Requested At */}
                    <TableCell>
                      {item?.requested_at
                        ? format(
                            new Date(item.requested_at),
                            "dd MMM yyyy, hh:mm a",
                          )
                        : "N/A"}
                    </TableCell>

                    {/* Review */}
                    <TableCell>
                      <Button
                        variant={item?.review ? "outline" : "default"}
                        onClick={() => {
                          setSelectedReviewData(item);
                          setOpenReviewModal(true);
                        }}
                      >
                        {item?.review ? "Update Review" : "Review"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={10}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No joined events found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <ReviewModal
        open={openReviewModal}
        onOpenChange={setOpenReviewModal}
        reviewData={selectedReviewData}
      />
    </>
  );
};

export default JoinRequestTable;
