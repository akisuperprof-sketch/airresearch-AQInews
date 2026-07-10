import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

interface SourceBadgeProps {
  label: string;
  className?: string;
}

export function SourceBadge({ label, className }: SourceBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center text-xs text-slate-500",
        className
      )}
    >
      <Info className="w-3 h-3 mr-1 opacity-70" />
      出典: {label}
    </div>
  );
}
