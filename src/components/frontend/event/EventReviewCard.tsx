"use client";

import { Review } from "@/api/review/review.api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/hooks/date-format";
import { Star } from "lucide-react";

type Props = {
  review: Review;
};

const EventReviewCard = ({ review }: Props) => {
  const userName = review.user?.name || "Anonymous";
  const userImage = review.user?.image || "";
  const fallback = userName?.slice(0, 2).toUpperCase();

  return (
    <Card className="rounded-2xl border shadow-sm">
      <CardContent className="p-4 space-y-3">
        {/* User */}
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={userImage} alt={userName} />
            <AvatarFallback>{fallback}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {userName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(review.createdAt)}
                </p>
              </div>

              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Comment */}
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {review.comment || "No comment provided."}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventReviewCard;
