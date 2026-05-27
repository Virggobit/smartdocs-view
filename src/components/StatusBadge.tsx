import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CheckCircle2, Clock, AlertCircle, Circle } from "lucide-react";

export type StatusTone = "success" | "pending" | "warning" | "neutral";

const toneStyles: Record<StatusTone, string> = {
  success: "bg-accent/15 text-accent border-accent/30",
  pending: "bg-primary/10 text-primary border-primary/30",
  warning: "bg-destructive/10 text-destructive border-destructive/30",
  neutral: "bg-muted text-muted-foreground border-border",
};

const toneIcon = {
  success: CheckCircle2,
  pending: Clock,
  warning: AlertCircle,
  neutral: Circle,
};

interface StatusBadgeProps {
  tone?: StatusTone;
  label: string;
  className?: string;
}

export const StatusBadge = ({ tone = "neutral", label, className }: StatusBadgeProps) => {
  const Icon = toneIcon[tone];
  return (
    <Badge
      variant="outline"
      className={cn("gap-1.5 border px-2.5 py-1 text-xs font-medium", toneStyles[tone], className)}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </Badge>
  );
};
