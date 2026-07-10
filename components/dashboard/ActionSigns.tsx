import { ActionSigns as ActionSignsType } from "@/lib/air/actionSigns";
import { cn } from "@/lib/utils";
import { Footprints, Wind, Dumbbell, Baby, User, Shirt } from "lucide-react";

interface ActionSignsProps {
  signs: ActionSignsType;
  className?: string;
  variant?: "compact" | "full";
}

export function ActionSigns({ signs, className, variant = "full" }: ActionSignsProps) {
  const items = [
    { label: "外出", value: signs.goOut, icon: Footprints },
    { label: "換気", value: signs.ventilation, icon: Wind },
    { label: "運動", value: signs.exercise, icon: Dumbbell },
    { label: "子ども", value: signs.kids, icon: Baby },
    { label: "高齢者", value: signs.elderly, icon: User },
    { label: "洗濯", value: signs.laundry, icon: Shirt },
  ];

  // コンパクト表示の場合は上から3つ程度にする等の要件があれば調整
  const displayItems = variant === "compact" ? items.slice(0, 3) : items;

  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-3 gap-2", className)}>
      {displayItems.map((item, idx) => {
        const Icon = item.icon;
        
        // 値に応じた色付け（簡易的）
        const isWarning = item.value.includes("推奨") || item.value.includes("様子見") || item.value.includes("必要時") || item.value.includes("控えめ") || item.value.includes("室内干し") || item.value.includes("早めに");
        const isSafe = item.value.includes("OK") || item.value === "軽め";
        
        let valueColor = "text-slate-700";
        if (isWarning) valueColor = "text-orange-700 font-semibold";
        if (isSafe) valueColor = "text-green-700 font-medium";

        return (
          <div key={idx} className="flex items-center space-x-2 bg-slate-50/50 p-2 rounded-lg border border-slate-100">
            <div className="bg-white p-1.5 rounded-md shadow-sm text-slate-500">
              <Icon className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 leading-none mb-1">{item.label}</span>
              <span className={cn("text-xs leading-none", valueColor)}>{item.value}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
