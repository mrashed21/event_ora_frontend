"use client";

import Container from "@/components/custom/container";
import { CalendarDays, Sparkles, Users } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="py-16">
      <Container>
        {/* Hero */}
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">
            About <span className="text-emerald-500">Eventora</span>
          </h1>
          <p className="mt-4 text-muted-foreground">
            Eventora is a modern platform designed to simplify event creation,
            management, and participation — all in one place.
          </p>
        </div>

        {/* Features */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border p-6 text-center hover:shadow-md transition">
            <CalendarDays className="mx-auto mb-3 text-emerald-500" />
            <h3 className="font-semibold">Manage Events Easily</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Create, update, and organize your events with powerful tools.
            </p>
          </div>

          <div className="rounded-xl border p-6 text-center hover:shadow-md transition">
            <Users className="mx-auto mb-3 text-emerald-500" />
            <h3 className="font-semibold">Connect People</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Join events, invite others, and grow your community.
            </p>
          </div>

          <div className="rounded-xl border p-6 text-center hover:shadow-md transition">
            <Sparkles className="mx-auto mb-3 text-emerald-500" />
            <h3 className="font-semibold">Smart Experience</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Discover events tailored to your interests quickly.
            </p>
          </div>
        </div>

        {/* Mission */}
        <div className="mt-16 max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-semibold">Our Mission</h2>
          <p className="mt-3 text-muted-foreground">
            Our mission is to make event management seamless and accessible for
            everyone — from organizers to participants — by providing a fast,
            intuitive, and powerful platform.
          </p>
        </div>
      </Container>
    </div>
  );
};

export default AboutUs;