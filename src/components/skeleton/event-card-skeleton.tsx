"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const EventCardSkeleton = () => {
  return (
    <Card className="overflow-hidden rounded-3xl border bg-background">
      <Skeleton className="h-56 w-full" />

      <CardContent className="space-y-5 p-5">
        <div className="space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/3" />
        </div>

        <div className="flex items-center justify-between gap-3">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-32 rounded-xl" />
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCardSkeleton;