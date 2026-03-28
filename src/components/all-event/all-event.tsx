"use client";
import { useEventsAdmin } from "@/api/event/event.api";
import useSerial from "@/hooks/serial-number";
import { useState } from "react";
import Header from "../custom/header";
import Pagination from "../custom/pagination";
import { SearchField } from "../custom/search-field";
import AllEventTable from "./all-event-table";

const AllEvent = () => {
  const [page, set_page] = useState(1);
  const [limit, set_limit] = useState(10);
  const [search_term, set_search_term] = useState("");

  const { data: eventData, isLoading } = useEventsAdmin({
    page,
    limit,
    search_term,
  });


  const serial = useSerial(page, limit);

  return (
    <section className="space-y-6 w-full">
      <div className="w-full max-w-full overflow-hidden">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mt-5">
          <Header
            title="All Events"
            description="Manage and search all events here"
          />
        </div>
      </div>

      <div className="w-full max-w-sm overflow-hidden">
        <SearchField
          placeholder="Search all events..."
          onSearch={(v) => {
            set_page(1);
            set_search_term(v);
          }}
        />
      </div>

      <AllEventTable
        data={eventData?.data?.data || []}
        isLoading={isLoading}
        serial={serial}
      />
      <Pagination
        page={page}
        limit={limit}
        total={eventData?.data?.meta?.total}
        setPage={set_page}
        setLimit={set_limit}
      />
    </section>
  );
};

export default AllEvent;
