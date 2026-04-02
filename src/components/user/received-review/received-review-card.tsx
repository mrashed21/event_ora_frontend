"use client";

import { Review } from "@/api/review/review.api";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { formatDate } from "@/hooks/date-format";
import { CalendarDays, Mail, MapPin, Star, User2 } from "lucide-react";

type Props = {
  review: Review;
};

const ReceivedReviewCard = ({ review }: Props) => {
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
      <CardHeader className="space-y-3">
        {/* User Info */}
        <div className="space-y-1">
          <h3 className="line-clamp-1 text-base font-semibold text-foreground">
            {review.user?.name || "Unknown User"}
          </h3>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span className="line-clamp-1">{review.user?.email || "N/A"}</span>
          </div>
        </div>

        <Badge variant="secondary" className="w-fit rounded-full px-3 py-1">
          Received Review
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4">
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

export default ReceivedReviewCard;
