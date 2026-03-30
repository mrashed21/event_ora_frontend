"use client";

import { useMemo, useState } from "react";

import { useEvents } from "@/api/event/event.api";

import Pagination from "@/components/custom/pagination";
import { SearchField } from "@/components/custom/search-field";
import EventCardSkeleton from "@/components/skeleton/event-card-skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import EventCard from "./event-card";
import { EventItem, EventsResponse, FilterType } from "./event.interface";

const FILTERS: { label: string; value: FilterType }[] = [
  { label: "All", value: "all" },
  { label: "Public Free", value: "public_free" },
  { label: "Public Paid", value: "public_paid" },
  { label: "Private Free", value: "private_free" },
  { label: "Private Paid", value: "private_paid" },
];

const matchesFilter = (event: EventItem, filter: FilterType) => {
  const categoryType = event.category?.category_type;
  const isPaid = event.category?.is_paid;

  if (filter === "all") return true;
  if (filter === "public_free")
    return categoryType === "public" && isPaid === false;
  if (filter === "public_paid")
    return categoryType === "public" && isPaid === true;
  if (filter === "private_free")
    return categoryType === "private" && isPaid === false;
  if (filter === "private_paid")
    return categoryType === "private" && isPaid === true;

  return true;
};

const Event = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [search_term, setSearchTerm] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const { data: eventData, isLoading } = useEvents({
    page,
    limit,
    search_term,
  }) as {
    data: EventsResponse | undefined;
    isLoading: boolean;
  };

  const apiEvents = eventData?.data?.data ?? [];

  const filteredEvents = useMemo(() => {
    return apiEvents.filter((event) => matchesFilter(event, activeFilter));
  }, [apiEvents, activeFilter]);

  return (
    <section className="bg-linear-to-b from-background to-muted/20 py-10 md:py-14">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <Badge variant="outline" className="rounded-full px-4 py-1 text-sm">
              Events
            </Badge>

            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Discover Upcoming Events
            </h1>

            <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
              Search events by title or organizer and filter by public/private
              and free/paid categories.
            </p>
          </div>

          <div className="w-full md:max-w-sm">
            <SearchField
              placeholder="Search by title or organizer..."
              onSearch={(value) => {
                setPage(1);
                setSearchTerm(value);
              }}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-3">
          {FILTERS.map((filter) => (
            <Button
              key={filter.value}
              type="button"
              variant={activeFilter === filter.value ? "default" : "outline"}
              className={cn(
                "rounded-full px-5",
                activeFilter === filter.value && "shadow-sm",
              )}
              onClick={() => {
                setPage(1);
                setActiveFilter(filter.value);
              }}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Loading */}
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <EventCardSkeleton key={index} />
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          /* Empty */
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-dashed bg-background px-6 text-center">
            <h3 className="text-xl font-semibold">No events found</h3>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Try changing the search term or selecting a different filter.
            </p>
          </div>
        ) : (
          <>
            {/* Cards */}
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>

            {/* pagination  */}
            <Pagination
              page={page}
              limit={limit}
              total={eventData?.data?.meta?.total || 0}
              setPage={setPage}
              setLimit={setLimit}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default Event;
