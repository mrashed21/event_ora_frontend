"use client";

import { Review, useDeleteAdminReview } from "@/api/review/review.api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { formatDate } from "@/hooks/date-format";
import { CalendarDays, Mail, MapPin, Star, Trash2, User2 } from "lucide-react";

type Props = {
  review: Review;
};

const AllReviewCard = ({ review }: Props) => {
  const { mutate: deleteReview, isPending } = useDeleteAdminReview();

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <Card className="h-full rounded-2xl border border-border/60 shadow-sm transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
        <div className="space-y-1">
          <h3 className="line-clamp-1 text-base font-semibold text-foreground">
            {review.user?.name || "Unknown User"}
          </h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span className="line-clamp-1">{review.user?.email || "N/A"}</span>
          </div>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              size="icon"
              className="shrink-0 rounded-xl"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent className="rounded-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Review?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This review will be permanently
                removed from the system.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel className="rounded-xl">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="rounded-xl bg-destructive text-white hover:bg-destructive/90"
                onClick={() => deleteReview({ id: review.id })}
                disabled={isPending}
              >
                {isPending ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Event */}
        {/* Event Info */}
        <div className="space-y-2 rounded-xl border bg-muted/30 p-3">
          <p className="text-sm font-semibold text-emerald-600">
            {review.event?.event_title || "Untitled Event"}
          </p>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            <span>
              {review.event?.event_date
                ? formatDate(review.event.event_date)
                : "No date"}
            </span>
          </div>

          {review.event?.event_venue && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{review.event.event_venue}</span>
            </div>
          )}
        </div>

        {/* Rating */}
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">Rating</p>
          <div className="flex items-center gap-1">
            {renderStars(review.rating)}
          </div>
        </div>

        {/* Comment */}
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">Comment</p>
          <p className="min-h-12 text-sm leading-6 text-muted-foreground">
            {review.comment || "No comment provided."}
          </p>
        </div>
      </CardContent>

      <CardFooter className="border-t pt-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <User2 className="h-4 w-4" />
          <span>Submitted on {formatDate(review.createdAt)}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AllReviewCard;
