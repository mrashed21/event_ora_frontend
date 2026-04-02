"use client";

import { useAdminAllReviews } from "@/api/review/review.api";
import { Skeleton } from "@/components/ui/skeleton";
import AllReviewCard from "./all-review-card";

type Props = {};

const AllReview = ({}: Props) => {
  const { data, isLoading } = useAdminAllReviews();

  const reviews = data?.data || [];

  return (
    <section className="space-y-6 p-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">All Reviews</h1>
        <p className="text-sm text-muted-foreground">
          Manage and moderate all event reviews from users.
        </p>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="space-y-3 rounded-2xl border p-4">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-52" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-4 w-40" />
            </div>
          ))}
        </div>
      )}

      {/* Empty */}
      {!isLoading && reviews.length === 0 && (
        <div className="flex min-h-55 items-center justify-center rounded-2xl border border-dashed text-sm text-muted-foreground">
          No reviews found.
        </div>
      )}

      {/* Reviews Grid */}
      {!isLoading && reviews.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {reviews.map((review) => (
            <AllReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </section>
  );
};

export default AllReview;
