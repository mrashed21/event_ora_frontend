"use client";

import { useMyInvitations } from "@/api/invaitaion/invaitation.api";
import Header from "@/components/custom/header";
import MyInvitationTable from "./invitation-table";

const MyInvitationsPage = () => {
  const { data, isLoading } = useMyInvitations();

  return (
    <section className="space-y-6">
      <Header
        title="My Invitations"
        description="Manage invitations sent to you"
      />

      <MyInvitationTable data={data?.data || []} isLoading={isLoading} />
    </section>
  );
};

export default MyInvitationsPage;
