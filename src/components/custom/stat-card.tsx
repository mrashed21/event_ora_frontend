"use client";

import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  subtitle?: string;
};

const StatCard = ({ title, value, icon: Icon, subtitle }: Props) => {
  return (
    <Card className="rounded-2xl border shadow-sm transition-all hover:shadow-md">
      <CardContent className="flex items-center justify-between p-5">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>

        <div className="rounded-2xl bg-muted p-3">
          <Icon className="h-6 w-6 text-emerald-600" />
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;