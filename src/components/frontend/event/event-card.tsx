"use client";

import { ArrowRight, BadgeDollarSign, CalendarDays, User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EventCategory, EventItem } from "./event.interface";

interface EventCardProps {
  event: EventItem;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const formatFee = (fee?: number, isPaid?: boolean) => {
  if (!isPaid) return "Free";
  return `৳${fee ?? 0}`;
};

const getEventTypeBadge = (category?: EventCategory) => {
  if (!category) return null;

  const typeLabel = category.category_type === "public" ? "Public" : "Private";
  const priceLabel = category.is_paid ? "Paid" : "Free";

  return `${typeLabel} • ${priceLabel}`;
};

const EventCard = ({ event }: EventCardProps) => {
  const badgeText = getEventTypeBadge(event.category);

  return (
    <Card className="group overflow-hidden rounded-3xl border bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-56 overflow-hidden">
        <Image
          src={event.event_image || "/placeholder.jpg"}
          alt={event.event_title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

        {badgeText && (
          <Badge className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
            {badgeText}
          </Badge>
        )}

        {event.is_featured && (
          <Badge className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
            Featured
          </Badge>
        )}
      </div>

      <CardContent className="space-y-5 p-5">
        <div className="space-y-2">
          <h3 className="line-clamp-1 text-xl font-semibold tracking-tight">
            {event.event_title}
          </h3>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 shrink-0" />
              <span>
                {formatDate(event.event_date)}
                {event.event_time ? ` • ${event.event_time}` : ""}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <User2 className="h-4 w-4 shrink-0" />
              <span>
                {event.organizer?.user_name ||
                  event.user?.name ||
                  "Unknown Organizer"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <BadgeDollarSign className="h-4 w-4 shrink-0" />
              <span>
                {formatFee(event.registration_fee, event.category?.is_paid)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="text-xs text-muted-foreground">
            {event._count?.participants ?? 0} Joined
          </div>

          <Button asChild className="rounded-xl">
            <Link href={`/events/${event.id}`}>
              View Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
