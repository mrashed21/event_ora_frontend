"use client";

import { useCategoriesAdmin } from "@/api/category/category.api";
import CreateButton from "@/components/custom/create-button";
import Header from "@/components/custom/header";
import Pagination from "@/components/custom/pagination";
import { SearchField } from "@/components/custom/search-field";
import useSerial from "@/hooks/serial-number";
import { useState } from "react";
import CategoryCreate from "./category-create";
import CategoryTable from "./category-table";
import CategoryUpdate from "./category-update";

const Category = () => {
  const [page, set_page] = useState(1);
  const [limit, set_limit] = useState(10);
  const [search_term, set_search_term] = useState("");
  const [create_modal, set_create_modal] = useState(false);
  const [update_modal, set_update_modal] = useState(false);
  const [selected_category, set_selected_category] = useState(null);

  const { data: categoryData, isLoading } = useCategoriesAdmin({
    page,
    limit,
    search_term,
  });

  
  const serial = useSerial(page, limit);

  const handleUpdate = (item: any) => {
    set_selected_category(item);
    set_update_modal(true);
  };
  return (
    <section className="space-y-6 w-full">
      <div className="w-full max-w-full overflow-hidden">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mt-5">
          <Header
            title="All Categories"
            description="Manage and search all categories"
          />
          <CreateButton
            label="Add Category"
            onClick={() => set_create_modal(true)}
          />
        </div>
      </div>
      <div className="w-full max-w-sm overflow-hidden">
        <SearchField
          placeholder="Search categories..."
          onSearch={(v) => {
            set_page(1);
            set_search_term(v);
          }}
        />
      </div>

      <CategoryTable
        data={categoryData?.data?.data}
        isLoading={isLoading}
        serial={serial}
        handleUpdate={handleUpdate}
      />

      <Pagination
        page={page}
        limit={limit}
        total={categoryData?.data?.meta?.total}
        setPage={set_page}
        setLimit={set_limit}
      />
      <CategoryCreate open={create_modal} onOpenChange={set_create_modal} />

      <CategoryUpdate
        open={update_modal}
        onOpenChange={set_update_modal}
        category={selected_category}
      />
    </section>
  );
};

export default Category;
