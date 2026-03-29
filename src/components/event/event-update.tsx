"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";

import { cn } from "@/lib/utils";

import FileUpload from "@/components/custom/file-upload";
import FormInput from "@/components/custom/form-input";
import FormCombobox from "../custom/form-combobox";

import { useUpdateEvent } from "@/api/event/event.api";
import {
  create_event_schema,
  type EventFormData,
} from "@/schemas/event.shcema";

import { CategoryInterface } from "@/api/category/category.api";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventData?: any;
  categoryData?: CategoryInterface[];
};

const EventUpdate = ({
  open,
  onOpenChange,
  eventData,
  categoryData = [],
}: Props) => {
  const { mutateAsync: updateEvent } = useUpdateEvent();
  const [file, setFile] = useState<File | null>(null);

  const options = categoryData.map((category) => ({
    id: category.id,
    label: category.is_paid
      ? `${category.category_title} ${category.category_type} - Paid`
      : `${category.category_title} ${category.category_type} - Free`,
  }));

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
      category_id: "",
      registration_fee: undefined,
    },
  });

  const selectedCategoryId = watch("category_id");

  const selectedCategory = useMemo(() => {
    return categoryData.find((c) => c.id === selectedCategoryId);
  }, [categoryData, selectedCategoryId]);

  const isPaidCategory = !!selectedCategory?.is_paid;

  useEffect(() => {
    if (!isPaidCategory) {
      setValue("registration_fee", undefined, {
        shouldValidate: true,
      });
    }
  }, [isPaidCategory, setValue]);

  // ✅ initial data load
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
        category_id: eventData?.category_id || "",
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
      formData.append("category_id", data.category_id);

      if (
        isPaidCategory &&
        data.registration_fee !== undefined &&
        data.registration_fee !== null
      ) {
        formData.append("registration_fee", String(data.registration_fee));
      }

      if (file) {
        formData.append("event_image", file);
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
            register={register}
            error={errors.event_title}
          />

          {/* Date + Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          "w-full justify-start",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value
                          ? format(new Date(field.value), "PPP")
                          : "Pick a date"}
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) =>
                          date && field.onChange(date.toISOString())
                        }
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
            </div>

            <FormInput
              label="Event Time"
              name="event_time"
              type="time"
              register={register}
              error={errors.event_time}
            />
          </div>

          <FormInput
            label="Event Venue"
            name="event_venue"
            register={register}
            error={errors.event_venue}
          />

          {/* Category */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Category</label>
            <FormCombobox
              name="category_id"
              control={control}
              options={options}
              placeholder="Select category"
              rules={{ required: "Category is required" }}
            />

            {selectedCategory && (
              <p className="text-xs text-muted-foreground">
                {selectedCategory.is_paid
                  ? "Paid event category"
                  : "Free event category"}
              </p>
            )}
          </div>

          {/* Registration Fee */}
          {isPaidCategory && (
            <FormInput
              label="Registration Fee"
              name="registration_fee"
              type="text"
              register={register}
              error={errors.registration_fee}
              isNumber
            />
          )}

          {/* Description */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Event Description</label>
            <Textarea {...register("event_description")} rows={5} />
          </div>

          {/* Current Image */}
          {eventData?.event_image && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Current Image</label>
              <div className="relative h-52 w-full rounded-xl overflow-hidden border">
                <Image
                  src={eventData.event_image}
                  alt="Event"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* Upload */}
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
