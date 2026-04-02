"use client";

import { Review } from "@/api/review/review.api";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Star, Users } from "lucide-react";
import EventReviewCard from "./EventReviewCard";

type Props = {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  totalJoined: number;
};

const EventReviewSection = ({
  reviews,
  averageRating,
  totalReviews,
  totalJoined,
}: Props) => {
  return (
    <section className="mt-14 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">
          Reviews & Feedback
        </h2>
        <p className="text-sm text-muted-foreground">
          See what participants are saying about this event.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="rounded-2xl">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-xl bg-yellow-100 p-3 text-yellow-600">
              <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Average Rating</p>
              <h3 className="text-2xl font-bold">{averageRating || 0}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Reviews</p>
              <h3 className="text-2xl font-bold">{totalReviews || 0}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-xl bg-emerald-100 p-3 text-emerald-600">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Participants</p>
              <h3 className="text-2xl font-bold">{totalJoined || 0}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Review List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="flex min-h-45 items-center justify-center rounded-2xl border border-dashed text-sm text-muted-foreground">
            No reviews yet for this event.
          </div>
        ) : (
          reviews.map((review) => (
            <EventReviewCard key={review.id} review={review} />
          ))
        )}
      </div>
    </section>
  );
};

export default EventReviewSection;
