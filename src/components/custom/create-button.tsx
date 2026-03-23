"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type Props = {
  label?: string;
  onClick: () => void;
  className?: string;
};

const CreateButton = ({ label = "Create", onClick, className = "" }: Props) => {
  return (
    <Button
      type="button"
      onClick={onClick}
      className={`gap-2 shrink-0 whitespace-nowrap ${className}`}
    >
      <Plus className="h-4 w-4" />
      {label}
    </Button>
  );
};

export default CreateButton;
