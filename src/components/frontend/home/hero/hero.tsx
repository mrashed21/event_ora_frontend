"use client";

import { useFeaturedEvent } from "@/api/event/event.api";
import Container from "@/components/custom/container";
import HeroSkeleton from "@/components/skeleton/hero-skeleton";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { formatDate } from "@/hooks/date-format";
import Autoplay from "embla-carousel-autoplay";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  MapPin,
  Ticket,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Hero = () => {
  const { data: featuredEvent, isLoading } = useFeaturedEvent();
  const events = featuredEvent?.data || [];

  const plugin = useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    }),
  );

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  if (isLoading) {
    return <HeroSkeleton />;
  }

  if (!events.length) {
    return (
      <section className="w-full py-10 md:py-14">
        <Container>
          <div className="flex min-h-95 items-center justify-center rounded-3xl border bg-muted/30 text-center shadow-sm">
            <div className="space-y-3 px-6">
              <h2 className="text-2xl font-bold md:text-3xl">
                No Featured Events Available
              </h2>
              <p className="text-muted-foreground">
                Featured events will appear here once added.
              </p>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="w-full py-4 md:py-6">
      <Container>
        <Carousel
          setApi={setApi}
          plugins={[plugin.current]}
          opts={{ loop: true }}
          className="w-full"
        >
          <CarouselContent>
            {events.map((event: any) => {
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

              return (
                <CarouselItem key={event.id}>
                  <div className="relative overflow-hidden rounded-3xl border shadow-xl min-h-112.5 md:min-h-145">
                    {/* Background Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-700"
                      style={{
                        backgroundImage: `url(${event.event_image})`,
                      }}
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/60 to-black/30" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />
                    <div className="absolute inset-0 bg-black/20" />

                    {/* Floating Blur Glow */}
                    <div className="absolute -left-16 top-10 h-52 w-52 rounded-full bg-primary/20 blur-3xl" />
                    <div className="absolute bottom-10 right-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

                    {/* Content */}
                    <div className="relative z-10 flex min-h-112.5 md:min-h-145 items-center px-6 py-10 md:px-14 lg:px-20">
                      <div className="max-w-3xl text-white">
                        {/* Top badges */}
                        <div className="mb-5 flex flex-wrap items-center gap-3">
                          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-md">
                            <BadgeCheck className="h-4 w-4 text-primary" />
                            Featured Event
                          </div>

                          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-md">
                            <Ticket className="h-4 w-4 text-primary" />
                            {isPaid
                              ? `$ ${event.registration_fee || 0}`
                              : "Free Entry"}
                          </div>
                        </div>

                        {/* Title */}
                        <h1 className="max-w-2xl text-3xl font-bold leading-tight md:text-5xl lg:text-6xl">
                          {event.event_title}
                        </h1>

                        {/* Description */}
                        <p className="mt-5 max-w-2xl text-sm leading-7 text-white/85 md:text-base md:leading-8">
                          {event.event_description?.length > 140
                            ? `${event.event_description.slice(0, 140)}...`
                            : event.event_description ||
                              "Join this exciting event and explore something truly memorable."}
                        </p>

                        {/* Meta info */}
                        <div className="mt-6 flex flex-col gap-3 text-sm text-white/85 md:flex-row md:flex-wrap md:items-center md:gap-6 md:text-base">
                          <div className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4 text-primary" />
                            <span>{formatDate(event.event_date)}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span>
                              {event.event_venue || "Venue not specified"}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-primary" />
                            <span>{joinedCount} joined</span>
                          </div>
                        </div>

                        {/* Organizer */}
                        <div className="mt-4 text-sm text-white/75 md:text-base">
                          Organized by{" "}
                          <span className="font-semibold text-white">
                            {organizerName}
                          </span>
                        </div>

                        {/* CTA */}
                        <div className="mt-8 flex flex-wrap items-center gap-4">
                          <Link href={`/events/${event.id}`}>
                            <Button
                              size="lg"
                              className="group rounded-full px-7 shadow-xl"
                            >
                              View Details
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Button>
                          </Link>

                          <Link href="/events">
                            <Button
                              size="lg"
                              variant="outline"
                              className="rounded-full border-white/20 bg-white/10 px-7 text-white backdrop-blur-md hover:bg-white/20 hover:text-white"
                            >
                              Browse Events
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          {/* Navigation */}
          {events.length > 1 && (
            <>
              <CarouselPrevious className="left-4 border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20" />
              <CarouselNext className="right-4 border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20" />
            </>
          )}
        </Carousel>

        {/* Dots */}
        {events.length > 1 && (
          <div className="mt-5 flex items-center justify-center gap-2">
            {events.map((_: any, index: number) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  current === index
                    ? "w-8 bg-primary"
                    : "w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default Hero;
