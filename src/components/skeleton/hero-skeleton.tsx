"use client";

import { Skeleton } from "@/components/ui/skeleton";

const HeroSkeleton = () => {
  return (
    <section className="w-full py-10 md:py-14">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl min-h-[420px] md:min-h-[520px] border shadow-sm bg-muted/30">
          {/* Background shimmer layer */}
          <Skeleton className="absolute inset-0 h-full w-full rounded-none" />

          {/* Overlay content */}
          <div className="relative z-10 flex min-h-[420px] md:min-h-[520px] items-center px-6 py-10 md:px-14">
            <div className="w-full max-w-2xl space-y-5">
              {/* Badge */}
              <Skeleton className="h-8 w-32 rounded-full" />

              {/* Title */}
              <div className="space-y-3">
                <Skeleton className="h-10 w-full max-w-[500px] rounded-xl" />
                <Skeleton className="h-10 w-full max-w-[380px] rounded-xl" />
              </div>

              {/* Meta */}
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
                <Skeleton className="h-5 w-40 rounded-md" />
                <Skeleton className="h-5 w-36 rounded-md" />
              </div>

              {/* Description */}
              <div className="space-y-3 pt-2">
                <Skeleton className="h-4 w-full max-w-[560px]" />
                <Skeleton className="h-4 w-full max-w-[500px]" />
                <Skeleton className="h-4 w-full max-w-[420px]" />
              </div>

              {/* CTA */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Skeleton className="h-11 w-36 rounded-full" />
                <Skeleton className="h-11 w-28 rounded-full" />
              </div>
            </div>
          </div>

          {/* Nav button skeleton */}
          <Skeleton className="absolute left-4 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full" />
          <Skeleton className="absolute right-4 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSkeleton;
