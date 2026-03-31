"use client";

import { useEventById } from "@/api/event/event.api";
import { useCreateParticipant } from "@/api/payment/payment.api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
};

const EventDetails = ({ id }: Props) => {
  const { data, isLoading, isError } = useEventById(id);
  const { mutateAsync: createParticipant } = useCreateParticipant();
  const router = useRouter();

  const event = data?.data;

  const handleParticipation = async (id: string) => {
    try {
      const res = await createParticipant({ event_id: id });
      router.push(res?.data?.checkoutUrl);
    } catch (error) {}
  };
  // 🔥 Skeleton Loader
  if (isLoading) {
    return (
      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-2">
            <Skeleton className="h-87.5 w-full rounded-2xl" />

            <div className="space-y-6">
              <Skeleton className="h-8 w-3/4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-20 w-full rounded-xl" />
              <Skeleton className="h-16 w-full rounded-xl" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </section>
    );
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
          <Card className="overflow-hidden rounded-2xl">
            <div className="relative h-87.5 w-full">
              <Image
                src={event.event_image}
                alt={event.event_title}
                fill
                className="object-cover"
              />
            </div>
          </Card>

          {/* Content */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{event.event_title}</h1>

            <div className="space-y-2 text-sm text-muted-foreground">
              <p>📅 Date: {new Date(event.event_date).toLocaleDateString()}</p>
              <p>⏰ Time: {event.event_time}</p>
              <p>📍 Venue: {event.event_venue}</p>
            </div>

            <p className="text-base leading-relaxed">
              {event.event_description}
            </p>

            {/* Organizer */}
            <Card>
              <CardContent className="p-4 space-y-1">
                <h3 className="font-semibold">Organizer</h3>
                <p className="text-sm text-muted-foreground">
                  {event.organizer?.user_name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {event.organizer?.user_email}
                </p>
              </CardContent>
            </Card>

            {/* Fee */}
            <Card>
              <CardContent className="flex items-center justify-between p-4">
                <span className="font-medium">Registration Fee</span>
                <span className="text-lg font-bold">
                  {event.registration_fee > 0
                    ? `$ ${event.registration_fee}`
                    : "Free"}
                </span>
              </CardContent>
            </Card>

            {/* Action Button */}
            <Button
              onClick={async () => {
                await handleParticipation(event.id);
              }}
              className="w-full h-12 text-base font-semibold"
            >
              {getActionLabel()}
            </Button>

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
