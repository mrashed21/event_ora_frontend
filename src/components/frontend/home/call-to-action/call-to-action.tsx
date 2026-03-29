"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarPlus, Ticket } from "lucide-react";
import Link from "next/link";

const CTASection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl border bg-card px-6 py-12 shadow-sm md:px-12 md:py-16">
          {/* Background glow */}
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
          <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
              Get Started Today
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              Create unforgettable events or join the ones you love
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
              Whether you want to organize your own event or discover exciting
              experiences around you, our platform makes everything simple,
              fast, and seamless.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/create-event">
                  <CalendarPlus className="mr-2 h-5 w-5" />
                  Create Events
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-8"
              >
                <Link href="/events">
                  <Ticket className="mr-2 h-5 w-5" />
                  Join Events
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Optional mini trust text */}
            <p className="mt-6 text-sm text-muted-foreground">
              Discover public and private events, free and paid — all in one
              place.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
