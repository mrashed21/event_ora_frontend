"use client";

import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Sparkles,
  User2,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { EventInterface, useUpComingEvent } from "@/api/event/event.api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate, formatTime } from "@/hooks/date-format";

const UpComing = () => {
  const { data: upComingEvents, isLoading } = useUpComingEvent();

  const events: EventInterface[] = upComingEvents?.data || [];

  if (isLoading) {
    return (
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-3">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-8 w-72" />
              <Skeleton className="h-4 w-96 max-w-full" />
            </div>
            <Skeleton className="h-10 w-32 rounded-full" />
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <Card
                key={i}
                className="overflow-hidden rounded-3xl border bg-background/60 backdrop-blur"
              >
                <Skeleton className="h-56 w-full" />
                <CardContent className="space-y-4 p-5">
                  <Skeleton className="h-5 w-20 rounded-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <div className="space-y-3 pt-2">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </CardContent>
                <CardFooter className="p-5 pt-0">
                  <Skeleton className="h-11 w-full rounded-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!events.length) {
    return (
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <Card className="rounded-3xl border-dashed">
            <CardContent className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <p className="text-sm font-medium text-muted-foreground">
                Upcoming Events
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
                No upcoming events found
              </h2>
              <p className="mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
                There are no scheduled events available right now. Please check
                back later.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-medium text-primary">
              Upcoming Events
            </p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Join exciting upcoming events
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
              Discover workshops, meetups, seminars, and public events happening
              soon.
            </p>
          </div>

          <Button asChild variant="outline" className="rounded-full px-6">
            <Link href="/events">View All Events</Link>
          </Button>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {events.map((event) => {
            const isPaid = event.category?.is_paid;
            const organizerName =
              event.organizer?.user_name ||
              event.user?.name ||
              "Unknown Organizer";

            const joinedCount =
              event.total_joined ||
              event._count?.participants ||
              event.joined_participants?.length ||
              0;

            const categoryType = event.category?.category_type || "Event";

            return (
              <Card
                key={event.id}
                className="group overflow-hidden rounded-3xl border bg-background/70 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  {event.event_image ? (
                    <Image
                      src={event.event_image}
                      alt={event.event_title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-muted" />
                  )}

                  {/* overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Top badges */}
                  <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    <Badge className="rounded-full border border-white/20 bg-black/50 px-3 py-1 text-white backdrop-blur-md hover:bg-black/50">
                      {isPaid ? `৳ ${event.registration_fee || 0}` : "Free"}
                    </Badge>

                    {event.is_featured && (
                      <Badge className="rounded-full border border-white/20 bg-white/15 px-3 py-1 text-white backdrop-blur-md hover:bg-white/15">
                        <Sparkles className="mr-1 h-3.5 w-3.5" />
                        Featured
                      </Badge>
                    )}
                  </div>

                  {/* Bottom venue quick */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-xs text-white backdrop-blur-md">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">
                        {event.event_venue || "Venue not specified"}
                      </span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-5">
                  {/* Title */}
                  <h3 className="line-clamp-1 text-xl font-semibold tracking-tight">
                    {event.event_title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
                    {event.event_description ||
                      "Join this upcoming event and explore a great experience."}
                  </p>

                  {/* Meta */}
                  <div className="mt-5 space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 shrink-0 text-primary" />
                      <span>
                        {formatDate(event.event_date)}
                        {event.event_time
                          ? ` • ${formatTime(event.event_time)}`
                          : ""}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <User2 className="h-4 w-4 shrink-0 text-primary" />
                      <span className="line-clamp-1">{organizerName}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 shrink-0 text-primary" />
                      <span>{joinedCount} joined</span>
                    </div>
                  </div>

                  {/* Footer info */}
                  <div className="mt-5 flex items-center justify-between border-t pt-4 text-sm">
                    <Badge
                      variant="outline"
                      className="rounded-full capitalize"
                    >
                      {categoryType}
                    </Badge>

                    <span className="text-muted-foreground">
                      {isPaid ? "Paid Event" : "Open Access"}
                    </span>
                  </div>
                </CardContent>

                <CardFooter className="p-5 pt-0">
                  <Button asChild className="w-full rounded-full">
                    <Link href={`/events/${event.id}`}>
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UpComing;
