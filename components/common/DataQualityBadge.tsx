import { DataQuality } from "@/lib/air/mockData";
import { cn } from "@/lib/utils";
import { AlertCircle, Clock, Database, CheckCircle2, TestTube } from "lucide-react";

interface DataQualityBadgeProps {
  quality: DataQuality;
  className?: string;
}

export function DataQualityBadge({ quality, className }: DataQualityBadgeProps) {
  let label = "";
  let icon = null;
  let colorClass = "";

  switch (quality) {
    case "live":
      label = "速報値";
      icon = <CheckCircle2 className="w-3 h-3 mr-1" />;
      colorClass = "bg-green-100 text-green-800 border-green-200";
      break;
    case "cached":
      label = "キャッシュ";
      icon = <Database className="w-3 h-3 mr-1" />;
      colorClass = "bg-gray-100 text-gray-800 border-gray-200";
      break;
    case "partial":
      label = "一部確認中";
      icon = <AlertCircle className="w-3 h-3 mr-1" />;
      colorClass = "bg-yellow-100 text-yellow-800 border-yellow-200";
      break;
    case "delayed":
      label = "更新待ち";
      icon = <Clock className="w-3 h-3 mr-1" />;
      colorClass = "bg-orange-100 text-orange-800 border-orange-200";
      break;
    case "fallback":
      label = "参考表示";
      icon = <AlertCircle className="w-3 h-3 mr-1" />;
      colorClass = "bg-gray-100 text-gray-600 border-gray-200";
      break;
    case "demo":
      label = "デモデータ";
      icon = <TestTube className="w-3 h-3 mr-1" />;
      colorClass = "bg-purple-100 text-purple-800 border-purple-200";
      break;
    default:
      label = "不明";
      colorClass = "bg-gray-100 text-gray-800";
  }

  return (
    <div
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border",
        colorClass,
        className
      )}
    >
      {icon}
      {label}
    </div>
  );
}
