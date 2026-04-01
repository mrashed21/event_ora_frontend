"use client";

import { useEventsUser } from "@/api/event/event.api";
import {
  useCreateInvitation,
  useSentInvitations,
} from "@/api/invaitaion/invaitation.api";
import { useUsers } from "@/api/user/user.api";
import CreateButton from "@/components/custom/create-button";
import FormCombobox from "@/components/custom/form-combobox";
import Header from "@/components/custom/header";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import InvitationTable from "./invitation-table";

type FormValues = {
  user_id: string;
  event_id: string;
};

const SendInvaitation = () => {
  const { data: userData } = useUsers({ page: 1, limit: 9999 });
  const { data: eventData } = useEventsUser({ page: 1, limit: 9999 });
  const { data: sentInvitationsData } = useSentInvitations();

  const { mutateAsync: sendInvitation } = useCreateInvitation();
  const [open, setOpen] = useState(false);

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>();

  const users = userData?.data?.data || [];
  const events = eventData?.data?.data || [];

  const userOptions = users.map((user: any) => ({
    id: user.id,
    label: user.name,
    email: user.email,
  }));

  const eventOptions = events.map((event: any) => ({
    id: event.id,
    label: event.event_title,
  }));

  const selectedUserId = watch("user_id");
  const selectedUser = users.find((u: any) => u.id === selectedUserId);

  const onSubmit = async (data: FormValues) => {
    try {
      const payload = {
        user_id: data.user_id,
        email: selectedUser?.email,
        event_id: data.event_id,
      };
      const res = await sendInvitation(payload);
      toast.success(res.message || "Invitation sent successfully!");

      setOpen(false);
      reset();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to send invitation.",
      );
      console.error("Error sending invitation:", error);
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <Header
          title="Send Invitation"
          description="Send invitation to your friends"
        />

        {/* Button */}
        <CreateButton label="Send Invitation" onClick={() => setOpen(true)} />
      </div>

      <InvitationTable data={sentInvitationsData?.data || []} />
      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Send Invitation</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* USER */}
            <div className="space-y-1">
              <label className="text-sm font-medium">User</label>
              <FormCombobox
                name="user_id"
                control={control}
                options={userOptions}
                placeholder="Select user"
                searchPlaceholder="Search user..."
                rules={{ required: "User is required" }}
              />
              {errors.user_id && (
                <p className="text-sm text-red-500">{errors.user_id.message}</p>
              )}

              {selectedUser && (
                <p className="text-xs text-muted-foreground">
                  Email: {selectedUser.email}
                </p>
              )}
            </div>

            {/* EVENT */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Event</label>
              <FormCombobox
                name="event_id"
                control={control}
                options={eventOptions}
                placeholder="Select event"
                searchPlaceholder="Search event..."
                rules={{ required: "Event is required" }}
              />
              {errors.event_id && (
                <p className="text-sm text-red-500">
                  {errors.event_id.message}
                </p>
              )}
            </div>

            {/* ACTION */}
            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Invitation"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default SendInvaitation;
