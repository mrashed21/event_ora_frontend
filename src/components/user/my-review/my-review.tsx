"use client";

import { useMyReviews } from "@/api/review/review.api";
import { Skeleton } from "@/components/ui/skeleton";
import MyReviewCard from "./my-review-card";

type Props = {};

const MyReview = ({}: Props) => {
  const { data, isLoading } = useMyReviews();

  const reviews = data?.data || [];

  return (
    <section className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">My Reviews</h1>
        <p className="text-sm text-muted-foreground">
          Manage your submitted reviews
        </p>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-xl" />
          ))}
        </div>
      )}

      {/* Empty */}
      {!isLoading && reviews.length === 0 && (
        <div className="text-center text-muted-foreground">
          You haven't added any reviews yet.
        </div>
      )}

      {/* List */}
      {!isLoading && reviews.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <MyReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </section>
  );
};

export default MyReview;