"use client";

import { useCreateReview, useUpdateReview } from "@/api/review/review.api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type ReviewModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reviewData: any | null;
};

type FormValues = {
  rating: number;
  comment: string;
};

const ReviewModal = ({ open, onOpenChange, reviewData }: ReviewModalProps) => {
  const { mutate: createReview, isPending: isCreating } = useCreateReview();
  const { mutate: updateReview, isPending: isUpdating } = useUpdateReview();

  const isEdit = !!reviewData?.review?.id;
  const isLoading = isCreating || isUpdating;

  const { register, handleSubmit, setValue, watch, reset } =
    useForm<FormValues>({
      defaultValues: {
        rating: 0,
        comment: "",
      },
    });

  const selectedRating = watch("rating");

  useEffect(() => {
    if (reviewData) {
      reset({
        rating: reviewData?.review?.rating || 0,
        comment: reviewData?.review?.comment || "",
      });
    }
  }, [reviewData, reset]);

  const onSubmit = (values: FormValues) => {
    const payload = {
      eventId: reviewData?.event?.id,
      rating: values.rating,
      comment: values.comment,
    };

    if (!payload.eventId) return;

    if (isEdit) {
      updateReview(
        {
          id: reviewData.review.id,
          ...payload,
        },
        {
          onSuccess: () => {
            onOpenChange(false);
            reset();
          },
        },
      );
    } else {
      createReview(payload, {
        onSuccess: () => {
          onOpenChange(false);
          reset();
        },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {isEdit ? "Update Review" : "Write a Review"}
          </DialogTitle>
          <DialogDescription>
            {reviewData?.event?.event_title || "Event review"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-2">
          {/* Rating */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Rating</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setValue("rating", star)}
                  className="transition hover:scale-110"
                >
                  <Star
                    className={cn(
                      "h-7 w-7",
                      star <= selectedRating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300",
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Comment</label>
            <Textarea
              rows={5}
              placeholder="Write your experience about this event..."
              {...register("comment")}
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isLoading || selectedRating === 0}>
              {isLoading
                ? isEdit
                  ? "Updating..."
                  : "Submitting..."
                : isEdit
                  ? "Update Review"
                  : "Submit Review"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;
