"use client";

import { useFeaturedEvent } from "@/api/event/event.api";
import Container from "@/components/custom/container";
import HeroSkeleton from "@/components/skeleton/hero-skeleton";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { formatDate } from "@/hooks/date-format";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

const Hero = () => {
  const { data: featuredEvent, isLoading } = useFeaturedEvent();

  const events = featuredEvent?.data || [];

  const plugin = useRef(
    Autoplay({
      delay: 3500,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    }),
  );

  if (isLoading) {
    return <HeroSkeleton />;
  }

  return (
    <section className="w-full">
      <Container>
        <Carousel
          plugins={[plugin.current]}
          opts={{ loop: true }}
          className="w-full"
        >
          <CarouselContent>
            {events.map((event: any) => (
              <CarouselItem key={event.id}>
                <div className="relative overflow-hidden rounded-b-xl min-h-[420px] md:min-h-[520px] border shadow-sm">
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center scale-105"
                    style={{
                      backgroundImage: `url(${event.event_image})`,
                    }}
                  />

                  {/*  Strong Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Content */}
                  <div className="relative z-10 flex min-h-[420px] md:min-h-[520px] items-center px-6 py-10 md:px-14">
                    <div className="max-w-2xl text-white">
                      {/* Badge */}
                      <div className="mb-4 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm backdrop-blur-md">
                        Featured Event
                      </div>

                      {/* Title */}
                      <h1 className="text-3xl font-bold leading-tight md:text-5xl">
                        {event.event_title}
                      </h1>

                      {/* Meta */}
                      <div className="mt-5 flex flex-col gap-3 text-sm text-white/85 md:flex-row md:items-center md:gap-6 md:text-base">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4" />
                          <span>{formatDate(event.event_date)}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>
                            {event.event_venue || "Venue not specified"}
                          </span>
                        </div>
                      </div>

                      {/* Description (80 char) */}
                      <p className="mt-6 max-w-xl text-sm leading-7 text-white/85 md:text-base">
                        {event.event_description?.length > 80
                          ? `${event.event_description.slice(0, 80)}...`
                          : event.event_description}
                      </p>

                      {/* CTA */}
                      <div className="mt-8 flex flex-wrap items-center gap-4">
                        <Link href={`/events/${event.id}`}>
                          <Button
                            size="lg"
                            className="rounded-full px-6 shadow-lg"
                          >
                            Join Event
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>

                        <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md">
                          {event.is_paid
                            ? `৳ ${event.registration_fee}`
                            : "Free Entry"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation */}
          {events.length > 1 && (
            <>
              <CarouselPrevious className="left-4 border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20" />
              <CarouselNext className="right-4 border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20" />
            </>
          )}
        </Carousel>
      </Container>
    </section>
  );
};

export default Hero;
