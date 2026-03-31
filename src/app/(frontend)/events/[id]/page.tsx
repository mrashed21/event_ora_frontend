import EventDetails from "@/components/frontend/event/event-details";
import { Metadata } from "next";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const metadata: Metadata = {
  title: "Event Details",
  description:
    "View detailed information about a specific event, including its title, date, time, venue, description, organizer details, and registration fee. Users can also see if the event is featured and how many participants have joined.",
};

const EventDetailsPage = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <section>
      <EventDetails id={id} />
    </section>
  );
};

export default EventDetailsPage;
