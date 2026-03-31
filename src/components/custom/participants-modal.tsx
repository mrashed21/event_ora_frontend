"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Mail, Users } from "lucide-react";

type Participant = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  emailVerified?: boolean;
  user_role?: string;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  participants?: Participant[];
  eventTitle?: string;
};

const ParticipantsModal = ({
  open,
  onOpenChange,
  participants = [],
  eventTitle,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Users className="h-5 w-5" />
            Joined Participants
          </DialogTitle>
          <DialogDescription>
            {eventTitle
              ? `Participants who joined "${eventTitle}"`
              : "List of joined participants"}
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-105 overflow-y-auto pr-1 space-y-3">
          {participants.length > 0 ? (
            participants.map((participant) => (
              <div
                key={participant.id}
                className="flex items-center justify-between rounded-xl border bg-muted/30 p-4"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-11 w-11">
                    <AvatarImage
                      src={participant.image || ""}
                      alt={participant.name}
                    />
                    <AvatarFallback>
                      {participant.name?.slice(0, 2)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="space-y-1">
                    <h4 className="font-semibold leading-none">
                      {participant.name || "Unknown User"}
                    </h4>

                    <p className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Mail className="h-3.5 w-3.5" />
                      {participant.email || "No email"}
                    </p>

                    
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex min-h-45 items-center justify-center rounded-xl border border-dashed">
              <div className="text-center">
                <Users className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
                <p className="font-medium">No participants yet</p>
                <p className="text-sm text-muted-foreground">
                  Nobody has joined this event so far.
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ParticipantsModal;
