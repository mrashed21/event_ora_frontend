import Event from "@/components/frontend/event/event";

export const metadata = {
  title: "Events",
  description: "Explore upcoming events and activities.",
};
const EventPage = () => {
  return (
    <section>
      <Event />
    </section>
  );
};

export default EventPage;
