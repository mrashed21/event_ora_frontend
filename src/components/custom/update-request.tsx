"use client";

import { useUpdateRequest } from "@/api/pending-request/pending-request.api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  participantId: string;
  eventId: string;
  type: "approved" | "rejected";
}

const UpdateRequestModal = ({
  open,
  setOpen,
  participantId,
  eventId,
  type,
}: Props) => {
  const [note, setNote] = useState("");
  const { mutate, isPending } = useUpdateRequest();

  const handleSubmit = () => {
    mutate(
      {
        id: eventId,
        participant_id: participantId,
        replay_note: note,
        status: type,
      },
      {
        onSuccess: () => {
          setOpen(false);
          setNote("");
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="rounded-2xl">
        <DialogHeader>
          <DialogTitle className="capitalize">
            {type === "approved" ? "Approve Request" : "Reject Request"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Textarea
            placeholder={
              type === "approved"
                ? "Write approval note..."
                : "Write rejection reason..."
            }
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="min-h-30"
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={isPending}
            className={
              type === "approved" ? "bg-emerald-600 hover:bg-emerald-700" : ""
            }
            variant={type === "rejected" ? "destructive" : "default"}
          >
            {isPending
              ? "Processing..."
              : type === "approved"
                ? "Approve"
                : "Reject"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateRequestModal;
