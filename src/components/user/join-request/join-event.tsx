"use client";

import { useJoinEvents } from "@/api/pending-request/pending-request.api";
import Header from "@/components/custom/header";
import Pagination from "@/components/custom/pagination";
import { useState } from "react";
import JoinRequestTable from "./join-request-table";

const JoinEvent = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, isLoading, isError } = useJoinEvents();

  if (isError) {
    return (
      <section className="p-6 text-red-500">
        Failed to load join events.
      </section>
    );
  }

  return (
    <section className="p-6">
      <div className="mb-5">
        <Header
          title="My Joined Events"
          description=" All your event participation requests are shown here."
        />
      </div>

      <JoinRequestTable data={data?.data?.data || []} isLoading={isLoading} />
      <Pagination
        page={page}
        limit={limit}
        total={data?.data?.meta.total || 0}
        setPage={setPage}
        setLimit={setLimit}
      />
    </section>
  );
};

export default JoinEvent;
