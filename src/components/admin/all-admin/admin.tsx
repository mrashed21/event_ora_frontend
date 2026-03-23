"use client";

import { useAdmins } from "@/api/dashboard/admin/all-admin/admin.api";
import CreateButton from "@/components/custom/create-button";
import Header from "@/components/custom/header";
import Pagination from "@/components/custom/pagination";
import { SearchField } from "@/components/custom/search-field";
import useSerial from "@/hooks/serial-number";
import { useState } from "react";
import AdminCreate from "./admin-create";
import AdminTable from "./admin-table";

const Admin = () => {
  const [page, set_page] = useState(1);
  const [limit, set_limit] = useState(10);
  const [search_term, set_search_term] = useState("");
  const [create_modal, set_create_modal] = useState(false);
  const [update_modal, set_update_modal] = useState(false);
  const [selected_admin, set_selected_admin] = useState(null);

  const { data, isLoading } = useAdmins({ page, limit, search_term });
  const serial = useSerial(page, limit);
  return (
    <section className="space-y-6 w-full">
      <div className="w-full max-w-full overflow-hidden">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mt-5">
          <Header
            title="All Admins"
            description="Manage and search all administrators"
          />
          <CreateButton
            label="Add Admin"
            onClick={() => set_create_modal(true)}
          />
        </div>
      </div>
      <div className="w-full max-w-sm overflow-hidden">
        <SearchField
          placeholder="Search admins..."
          onSearch={(v) => {
            set_page(1);
            set_search_term(v);
          }}
        />
      </div>
      <AdminTable
        data={data?.data?.data}
        isLoading={isLoading}
        serial={serial}
      />
      {/* Pagination */}
      <Pagination
        page={page}
        limit={limit}
        total={data?.data?.total || 0}
        setPage={set_page}
        setLimit={set_limit}
      />

      {/* Create Modal */}
      <AdminCreate open={create_modal} onOpenChange={set_create_modal} />
      {/* Update Modal */}
      {/* <AdminUpdate
        open={update_modal}
        onOpenChange={set_update_modal}
        admin={selected_admin}
      /> */}
    </section>
  );
};

export default Admin;
