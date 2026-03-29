"use client";

import { useUpComingEvent } from "@/api/event/event.api";

const UpComing = () => {
  const { data: upComingEvents, isLoading } = useUpComingEvent();
  console.log("up-coming events:", upComingEvents);
  return <section>Muhammad Rashed! Welcome to UpComing Components</section>;
};

export default UpComing;
