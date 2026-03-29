"use client";

import { ArrowRight, CalendarDays, MapPin, User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { EventInterface, useUpComingEvent } from "@/api/event/event.api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/hooks/date-format";

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
            <Skeleton className="h-10 w-32 rounded-md" />
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="overflow-hidden rounded-2xl">
                <Skeleton className="h-56 w-full" />
                <CardContent className="space-y-4 p-5">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <div className="space-y-3 pt-2">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </CardContent>
                <CardFooter className="grid grid-cols-2 gap-3 p-5 pt-0">
                  <Skeleton className="h-10 w-full rounded-md" />
                  <Skeleton className="h-10 w-full rounded-md" />
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
          <Card className="rounded-2xl border-dashed">
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
            <p className="mb-2 text-sm font-medium text-muted-foreground">
              Upcoming Events
            </p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Join exciting upcoming events
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
              Discover workshops, meetups, and public events happening soon.
            </p>
          </div>

          <Button asChild variant="outline">
            <Link href="/events">View All Events</Link>
          </Button>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {events.map((event) => (
            <Card
              key={event.id}
              className="group overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                {event.event_image ? (
                  <Image
                    src={event.event_image}
                    alt={event.event_title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="bg-muted h-full w-full" />
                )}

                <div className="absolute left-4 top-4 flex gap-2">
                  <Badge variant={event.is_paid ? "destructive" : "secondary"}>
                    {event.is_paid
                      ? `Paid${event.registration_fee ? ` • $${event.registration_fee}` : ""}`
                      : "Free"}
                  </Badge>

                  {event.is_featured && (
                    <Badge variant="default">Featured</Badge>
                  )}
                </div>
              </div>

              <CardContent className="p-5">
                <h3 className="line-clamp-1 text-xl font-semibold tracking-tight">
                  {event.event_title}
                </h3>

                <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
                  {event.event_description}
                </p>

                <div className="mt-5 space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 shrink-0" />
                    <span>
                      {formatDate(event.event_date)} • {event.event_time}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <User2 className="h-4 w-4 shrink-0" />
                    <span>{event.user?.name || "Unknown Organizer"}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 shrink-0" />
                    <span className="line-clamp-1">
                      {event.event_venue || "Venue not specified"}
                    </span>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t pt-4 text-sm">
                  <span className="text-muted-foreground">
                    {event._count?.participants || 0} joined
                  </span>

                  <Badge variant="outline" className="capitalize">
                    {event.event_type}
                  </Badge>
                </div>
              </CardContent>

              <CardFooter className=" gap-3 p-5 pt-0">
                <Button asChild className="w-full">
                  <Link href={`/events/${event.id}`}>
                    Join
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpComing;
