"use client";

import { usePendingParticipants } from "@/api/pending-request/pending-request.api";
import Header from "@/components/custom/header";
import Pagination from "@/components/custom/pagination";
import { useState } from "react";
import PendingRequestTable from "./pending-request-table";
import useSerial from "@/hooks/serial-number";

const PendingRequest = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading } = usePendingParticipants({ page, limit });

  const participants = data?.data?.data || [];
  const meta = data?.data?.meta;

  
  const serial = useSerial(page, limit);

  return (
    <section className="space-y-6">
      <div className="w-full max-w-full overflow-hidden">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mt-5">
          <Header
            title="Pending Requests"
            description="Manage and search all pending requests here"
          />
        </div>
      </div>

      <PendingRequestTable data={participants} isLoading={isLoading} serial={serial} />
      <Pagination
        page={page}
        limit={limit}
        total={meta?.total || 0}
        setPage={setPage}
        setLimit={setLimit}
      />
    </section>
  );
};

export default PendingRequest;
