"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import { cn } from "@/lib/utils";

import FileUpload from "@/components/custom/file-upload";
import FormInput from "@/components/custom/form-input";

import { useUpdateEvent } from "@/api/event/event.api";
import {
  create_event_schema,
  type EventFormData,
} from "@/schemas/event.shcema";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventData?: any;
};

const EventUpdate = ({ open, onOpenChange, eventData }: Props) => {
  const { mutateAsync: updateEvent } = useUpdateEvent();
  const [file, setFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EventFormData>({
    resolver: zodResolver(create_event_schema),
    defaultValues: {
      event_title: "",
      event_image: null,
      event_date: "",
      event_time: "",
      event_venue: "",
      event_description: "",
      event_status: "active",
      event_type: "public",
      is_paid: false,
      registration_fee: undefined,
    },
  });

  const selectedStatus = watch("event_status");
  const selectedEventType = watch("event_type");
  const isPaid = watch("is_paid");

  useEffect(() => {
    if (!isPaid) {
      setValue("registration_fee", undefined, {
        shouldValidate: true,
      });
    }
  }, [isPaid, setValue]);

  useEffect(() => {
    if (eventData && open) {
      reset({
        event_title: eventData?.event_title || "",
        event_image: null,
        event_date: eventData?.event_date
          ? new Date(eventData.event_date).toISOString()
          : "",
        event_time: eventData?.event_time || "",
        event_venue: eventData?.event_venue || "",
        event_description: eventData?.event_description || "",
        event_status: eventData?.event_status || "active",
        event_type: eventData?.event_type || "public",
        is_paid: eventData?.is_paid || false,
        registration_fee: eventData?.registration_fee || undefined,
      });

      setFile(null);
    }
  }, [eventData, open, reset]);

  const onSubmit = async (data: EventFormData) => {
    try {
      const formData = new FormData();

      formData.append("event_title", data.event_title);
      formData.append("event_date", data.event_date);
      formData.append("event_time", data.event_time);
      formData.append("event_venue", data.event_venue);
      formData.append("event_description", data.event_description);
      formData.append("event_status", data.event_status || "active");
      formData.append("event_type", data.event_type || "public");

      formData.append("is_paid", String(data.is_paid ?? false));

      if (
        data.is_paid &&
        data.registration_fee !== undefined &&
        data.registration_fee !== null
      ) {
        formData.append("registration_fee", String(data.registration_fee));
      }

      if (file) {
        formData.append("file", file);
      }

      const loadingToast = toast.loading("Updating event...");
      const payload = {
        formData,
        id: eventData?.id,
      };
      const res = await updateEvent(payload);

      toast.dismiss(loadingToast);
      toast.success(res?.message || "Event updated successfully!");

      reset();
      setFile(null);
      onOpenChange(false);
    } catch (err: any) {
      const message = err?.response?.data?.message || "Event update failed";
      toast.error(message);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        onOpenChange(value);
        if (!value) {
          reset();
          setFile(null);
        }
      }}
    >
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Event</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            label="Event Title"
            name="event_title"
            placeholder="Enter event title"
            register={register}
            error={errors.event_title}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Event Date */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Event Date</label>
              <Controller
                control={control}
                name="event_date"
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground",
                          errors.event_date && "border-red-500",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(new Date(field.value), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date: Date | undefined) => {
                          if (date) {
                            field.onChange(date.toISOString());
                          }
                        }}
                        initialFocus
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
              {errors.event_date && (
                <p className="text-sm text-red-500">
                  {errors.event_date.message}
                </p>
              )}
            </div>

            {/* Event Time */}
            <div className="space-y-1">
              <FormInput
                label="Event Time"
                name="event_time"
                type="time"
                register={register}
                error={errors.event_time}
              />
            </div>
          </div>

          <FormInput
            label="Event Venue"
            name="event_venue"
            placeholder="Enter event venue"
            register={register}
            error={errors.event_venue}
          />

          {/* Event Type */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Event Type</label>
            <Select
              value={selectedEventType}
              onValueChange={(value) =>
                setValue("event_type", value as "public" | "private", {
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
              </SelectContent>
            </Select>
            {errors.event_type && (
              <p className="text-sm text-red-500">
                {errors.event_type.message}
              </p>
            )}
          </div>

          {/* Is Paid */}
          <div className="flex items-center justify-between rounded-xl border p-4">
            <div className="space-y-1">
              <Label className="text-sm font-medium">Paid Event</Label>
              <p className="text-xs text-muted-foreground">
                Enable this if users need to pay to join the event.
              </p>
            </div>

            <Controller
              control={control}
              name="is_paid"
              render={({ field }) => (
                <Switch
                  checked={field.value || false}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>

          {/* Registration Fee */}
          {isPaid && (
            <FormInput
              label="Registration Fee"
              name="registration_fee"
              type="number"
              placeholder="Enter registration fee"
              register={register}
              error={errors.registration_fee}
            />
          )}

          {/* Event Status */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Event Status</label>
            <Select
              value={selectedStatus}
              onValueChange={(value) =>
                setValue("event_status", value as "active" | "in_active", {
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select event status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="in_active">Inactive</SelectItem>
              </SelectContent>
            </Select>
            {errors.event_status && (
              <p className="text-sm text-red-500">
                {errors.event_status.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Event Description</label>
            <Textarea
              placeholder="Write event description..."
              {...register("event_description")}
              rows={5}
            />
            {errors.event_description && (
              <p className="text-sm text-red-500">
                {errors.event_description.message}
              </p>
            )}
          </div>

          {/* Current Image */}
          {eventData?.event_image && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Current Image</label>
              <div className="relative h-52 w-full overflow-hidden rounded-xl border bg-muted">
                <Image
                  src={eventData.event_image}
                  alt={eventData?.event_title || "Event Image"}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* Image Upload */}
          <FileUpload
            label="Change Event Image"
            onChange={setFile}
            error={errors.event_image?.message as string}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Event"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventUpdate;
