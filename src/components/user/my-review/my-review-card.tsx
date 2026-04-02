"use client";

import {
  Review,
  useDeleteMyReview,
  useUpdateReview,
} from "@/api/review/review.api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Textarea } from "@/components/ui/textarea";
import { formatDate } from "@/hooks/date-format";

import { Pencil, Star, Trash2 } from "lucide-react";
import { useState } from "react";

type Props = {
  review: Review;
};

const MyReviewCard = ({ review }: Props) => {
  const { mutate: deleteReview, isPending: deleting } = useDeleteMyReview();
  const { mutate: updateReview, isPending: updating } = useUpdateReview();

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment || "");

  const handleUpdate = () => {
    updateReview(
      {
        id: review.id,
        eventId: review.eventId,
        rating,
        comment,
      },
      {
        onSuccess: () => {
          setOpen(false);
        },
      },
    );
  };

  const renderStars = () =>
    Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        onClick={() => setRating(i + 1)}
        className={`h-5 w-5 cursor-pointer transition ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));

  return (
    <Card className="rounded-2xl shadow-sm transition-all hover:shadow-md">
      <CardHeader className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold">{review.event?.event_title}</p>
          <p className="text-xs text-muted-foreground">
            {formatDate(review.createdAt)}
          </p>
        </div>

        <div className="flex gap-2">
          {/* EDIT */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="icon" variant="outline">
                <Pencil className="h-4 w-4" />
              </Button>
            </DialogTrigger>

            <DialogContent className="rounded-2xl">
              <DialogHeader>
                <DialogTitle>Edit Review</DialogTitle>
              </DialogHeader>

              {/* Rating */}
              <div className="flex gap-1">{renderStars()}</div>

              {/* Comment */}
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review..."
              />

              <Button onClick={handleUpdate} disabled={updating}>
                {updating ? "Updating..." : "Update Review"}
              </Button>
            </DialogContent>
          </Dialog>

          {/* DELETE */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="icon" variant="destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="rounded-2xl">
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this review?</AlertDialogTitle>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deleteReview({ id: review.id })}
                  disabled={deleting}
                >
                  {deleting ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <Badge variant="secondary">My Review</Badge>

        {/* Rating */}
        <div className="flex gap-1">
          {Array.from({ length: review.rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>

        {/* Comment */}
        <p className="text-sm text-muted-foreground">
          {review.comment || "No comment"}
        </p>
      </CardContent>

      <CardFooter className="text-xs text-muted-foreground">
        Updated: {formatDate(review.updatedAt)}
      </CardFooter>
    </Card>
  );
};

export default MyReviewCard;
