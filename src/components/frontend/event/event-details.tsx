"use client";

import { useEventById } from "@/api/event/event.api";
import Image from "next/image";

type Props = {
  id: string;
};

const EventDetails = ({ id }: Props) => {
  const { data, isLoading, isError } = useEventById(id);

  const event = data?.data;

  if (isLoading) {
    return <section className="py-20 text-center">Loading...</section>;
  }

  if (isError || !event) {
    return (
      <section className="py-20 text-center text-red-500">
        Failed to load event
      </section>
    );
  }

  const categoryType = event.category?.category_type;
  const isPaid = event.category?.is_paid;

  // 🔥 Action button logic
  const getActionLabel = () => {
    if (categoryType === "public" && !isPaid) return "Join Now";
    if (categoryType === "public" && isPaid) return "Pay & Join";
    if (categoryType === "private" && !isPaid) return "Request to Join";
    if (categoryType === "private" && isPaid) return "Pay & Request to Join";
  };

  return (
    <section className="py-10 md:py-14">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Image */}
          <div className="relative h-87.5 w-full overflow-hidden rounded-2xl">
            <Image
              src={event.event_image}
              alt={event.event_title}
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* Title */}
            <h1 className="text-3xl font-bold">{event.event_title}</h1>

            {/* Meta Info */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>📅 Date: {new Date(event.event_date).toLocaleDateString()}</p>
              <p>⏰ Time: {event.event_time}</p>
              <p>📍 Venue: {event.event_venue}</p>
            </div>

            {/* Description */}
            <p className="text-base leading-relaxed text-foreground">
              {event.event_description}
            </p>

            {/* Organizer */}
            <div className="rounded-xl border p-4">
              <h3 className="font-semibold">Organizer</h3>
              <p className="text-sm text-muted-foreground">
                {event.organizer?.user_name}
              </p>
              <p className="text-xs text-muted-foreground">
                {event.organizer?.user_email}
              </p>
            </div>

            {/* Fee */}
            <div className="flex items-center justify-between rounded-xl border p-4">
              <span className="font-medium">Registration Fee</span>
              <span className="text-lg font-bold">
                {event.registration_fee > 0
                  ? `৳ ${event.registration_fee}`
                  : "Free"}
              </span>
            </div>

            {/* Action Button */}
            <button className="w-full rounded-xl bg-primary py-3 text-white font-semibold transition hover:opacity-90">
              {getActionLabel()}
            </button>

            {/* Extra Info */}
            <div className="text-sm text-muted-foreground">
              👥 Participants: {event._count?.participants || 0}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
