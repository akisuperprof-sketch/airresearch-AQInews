import { AirType } from "@/lib/air/score";
import { cn } from "@/lib/utils";
import { Wind, Cloud, CloudFog, AlertTriangle, ShieldAlert, HelpCircle } from "lucide-react";

interface AirTypeBadgeProps {
  airType: AirType;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function AirTypeBadge({ airType, className, size = "md" }: AirTypeBadgeProps) {
  let colorClass = "";
  let Icon = HelpCircle;

  switch (airType) {
    case "すっきり空気":
      colorClass = "bg-blue-50 text-blue-700 border-blue-200";
      Icon = Wind;
      break;
    case "おだやか空気":
      colorClass = "bg-green-50 text-green-700 border-green-200";
      Icon = Cloud;
      break;
    case "もやっと空気":
      colorClass = "bg-yellow-50 text-yellow-700 border-yellow-200";
      Icon = CloudFog;
      break;
    case "ひかえめ空気":
      colorClass = "bg-orange-50 text-orange-700 border-orange-200";
      Icon = AlertTriangle;
      break;
    case "こもり空気":
      colorClass = "bg-red-50 text-red-700 border-red-200";
      Icon = ShieldAlert;
      break;
    case "確認中":
    default:
      colorClass = "bg-gray-50 text-gray-700 border-gray-200";
      Icon = HelpCircle;
      break;
  }

  const sizeClasses = {
    sm: "px-2 py-1 text-xs space-x-1",
    md: "px-3 py-1.5 text-sm space-x-1.5",
    lg: "px-4 py-2 text-base space-x-2 font-bold",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center font-medium rounded-full border",
        colorClass,
        sizeClasses[size],
        className
      )}
    >
      <Icon className={iconSizes[size]} />
      <span>{airType}</span>
    </div>
  );
}
