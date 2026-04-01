"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

type InvitationItem = {
  id: string;
  email: string;
  status: "pending" | "accepted" | "rejected";
  created_at: string;
  responded_at: string | null;
  event: {
    event_title: string;
    event_image: string;
    event_date: string;
    event_time: string;
    event_venue: string;
    category?: {
      category_title: string;
      category_type: string;
    };
    organizer?: {
      user_name: string;
    };
  };
  user: {
    name: string;
    email: string;
    image: string | null;
  };
};

type Props = {
  data: InvitationItem[];
};

const getStatusVariant = (status: string) => {
  switch (status) {
    case "accepted":
      return "default";
    case "rejected":
      return "destructive";
    default:
      return "secondary";
  }
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-BD", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const InvitationTable = ({ data }: Props) => {
  return (
    <section className="rounded-2xl border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invitee</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Organizer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Sent At</TableHead>
              <TableHead>Event Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.length > 0 ? (
              data.map((item) => (
                <TableRow key={item.id}>
                  {/* Invitee */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700">
                        {item.user?.image ? (
                          <Image
                            src={item.user.image}
                            alt={item.user.name}
                            width={40}
                            height={40}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          item.user?.name?.charAt(0)?.toUpperCase() || "U"
                        )}
                      </div>

                      <div>
                        <p className="font-medium text-gray-900">
                          {item.user?.name || "Unknown User"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Event */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-16 overflow-hidden rounded-md border bg-gray-100">
                        {item.event?.event_image ? (
                          <Image
                            src={item.event.event_image}
                            alt={item.event.event_title}
                            fill
                            className="object-cover"
                          />
                        ) : null}
                      </div>

                      <div>
                        <p className="font-medium text-gray-900">
                          {item.event?.event_title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.event?.event_venue}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Category */}
                  <TableCell>
                    <div>
                      <p className="font-medium">
                        {item.event?.category?.category_title || "N/A"}
                      </p>
                      <p className="text-sm text-muted-foreground capitalize">
                        {item.event?.category?.category_type || "N/A"}
                      </p>
                    </div>
                  </TableCell>

                  {/* Organizer */}
                  <TableCell>
                    <p className="font-medium">
                      {item.event?.organizer?.user_name || "N/A"}
                    </p>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Badge variant={getStatusVariant(item.status)}>
                      {item.status}
                    </Badge>
                  </TableCell>

                  {/* Sent At */}
                  <TableCell>{formatDate(item.created_at)}</TableCell>

                  {/* Event Date */}
                  <TableCell>
                    <div>
                      <p>{formatDate(item.event?.event_date)}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.event?.event_time}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="py-10 text-center text-muted-foreground"
                >
                  No invitations found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default InvitationTable;
