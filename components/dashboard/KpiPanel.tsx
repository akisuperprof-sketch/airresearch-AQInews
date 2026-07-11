import { Activity, Clock, AlertTriangle, Image as ImageIcon } from "lucide-react";

interface KpiData {
  freshnessMin: number;
  successRate: number;
  missingRate: number;
  cautionAreasCount: number;
  snapshotReadyCount: number;
}

interface KpiPanelProps {
  data: KpiData;
}

export function KpiPanel({ data }: KpiPanelProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <KpiCard 
        label="鮮度" 
        value={`${data.freshnessMin}分`} 
        icon={Clock} 
        trend={data.freshnessMin < 30 ? "good" : "bad"} 
      />
      <KpiCard 
        label="成功率" 
        value={`${data.successRate}%`} 
        icon={Activity} 
        trend={data.successRate > 95 ? "good" : "bad"} 
      />
      <KpiCard 
        label="注意" 
        value={`${data.cautionAreasCount}区`} 
        icon={AlertTriangle} 
        trend={data.cautionAreasCount === 0 ? "good" : "neutral"} 
      />
      <KpiCard 
        label="投稿候補" 
        value={`${data.snapshotReadyCount}件`} 
        icon={ImageIcon} 
        trend="neutral" 
      />
    </div>
  );
}

function KpiCard({ label, value, icon: Icon, trend }: { label: string; value: string; icon: any; trend: "good"|"bad"|"neutral" }) {
  let valueColor = "text-slate-900";
  if (trend === "good") valueColor = "text-green-600";
  if (trend === "bad") valueColor = "text-red-600";

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col">
      <div className="flex items-center space-x-2 text-slate-500 mb-2">
        <Icon className="w-4 h-4" />
        <span className="text-xs font-medium">{label}</span>
      </div>
      <div className={`text-2xl font-bold ${valueColor}`}>
        {value}
      </div>
    </div>
  );
}
