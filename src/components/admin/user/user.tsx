"use client";

import { useUsers } from "@/api/user/user.api";
import Header from "@/components/custom/header";
import Pagination from "@/components/custom/pagination";
import { SearchField } from "@/components/custom/search-field";
import useSerial from "@/hooks/serial-number";
import { useState } from "react";
import UserTable from "./user-table";
const User = () => {
  const [page, set_page] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search_term, set_search_term] = useState("");

  const { data, isLoading, error } = useUsers({
    page,
    limit,
    search_term,
  });
  const serial = useSerial(page, limit);
  return (
    <section className="space-y-6">
      <Header title="Users" description="Manage your users here." />

      <div className="max-w-sm">
        <div className="w-full max-w-sm overflow-hidden">
          <SearchField
            placeholder="Search user..."
            onSearch={(v) => {
              set_page(1);
              set_search_term(v);
            }}
          />
        </div>
      </div>

      <UserTable
        data={data?.data?.data || []}
        isLoading={isLoading}
        serial={serial}
      />

      <Pagination
        page={page}
        setPage={set_page}
        limit={limit}
        setLimit={setLimit}
        total={data?.data?.meta?.total || 0}
      />
    </section>
  );
};

export default User;
