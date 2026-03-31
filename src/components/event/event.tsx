"use client";
import { useGetMe } from "@/api/auth/auth.api";
import { useCategories } from "@/api/category/category.api";
import { useEventsUser } from "@/api/event/event.api";
import useSerial from "@/hooks/serial-number";
import { useState } from "react";
import CreateButton from "../custom/create-button";
import Header from "../custom/header";
import Pagination from "../custom/pagination";
import { SearchField } from "../custom/search-field";
import EventCreate from "./event-create";
import EventTable from "./event-table";
import EventUpdate from "./event-update";

const Event = () => {
  const [page, set_page] = useState(1);
  const [limit, set_limit] = useState(10);
  const [search_term, set_search_term] = useState("");
  const [create_modal, set_create_modal] = useState(false);
  const [update_modal, set_update_modal] = useState(false);
  const [selected_event, set_selected_event] = useState(null);

  const { data: userData } = useGetMe();
  const { data: eventData, isLoading } = useEventsUser({
    page,
    limit,
    search_term,
  });

  const { data: categoryData, refetch: categoryRefetch } = useCategories();

  const serial = useSerial(page, limit);

  const handleUpdate = (item: any) => {
    set_selected_event(item);
    set_update_modal(true);
  };

  return (
    <section className="space-y-6 w-full">
      <div className="w-full max-w-full overflow-hidden">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mt-5">
          <Header
            title="My Events"
            description="Manage and search your events here"
          />
          <CreateButton
            label="Add Event"
            onClick={() => set_create_modal(true)}
          />
        </div>
      </div>

      <div className="w-full max-w-sm overflow-hidden">
        <SearchField
          placeholder="Search your events..."
          onSearch={(v) => {
            set_page(1);
            set_search_term(v);
          }}
        />
      </div>
      <EventTable
        data={eventData?.data?.data || []}
        isLoading={isLoading}
        serial={serial}
        handleUpdate={handleUpdate}
      />

      <Pagination
        page={page}
        limit={limit}
        total={eventData?.data?.meta?.total}
        setPage={set_page}
        setLimit={set_limit}
      />

      <EventCreate
        open={create_modal}
        onOpenChange={set_create_modal}
        userData={userData?.data}
        categoryData={categoryData?.data}
      />

      <EventUpdate
        open={update_modal}
        onOpenChange={set_update_modal}
        eventData={selected_event}
        categoryData={categoryData?.data}
      />
    </section>
  );
};

export default Event;
