"use client";

import { useAdmins } from "@/api/dashboard/admin/all-admin/admin.api";
import { useState } from "react";

const Admin = () => {
  const [page, set_page] = useState(1);
  const [limit, set_limit] = useState(10);
  const [search_term, set_search_term] = useState("");
  const { data, isLoading } = useAdmins({ page, limit, search_term });
  console.log(data);
  return <section>Admin</section>;
};

export default Admin;
