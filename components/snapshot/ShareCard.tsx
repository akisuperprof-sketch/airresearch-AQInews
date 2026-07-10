import { AirMeasurement } from "@/lib/air/mockData";
import { AirTypeBadge } from "../dashboard/AirTypeBadge";
import { ActionSigns } from "../dashboard/ActionSigns";
import { format } from "date-fns";

interface ShareCardProps {
  measurement: AirMeasurement;
  variant?: "tokyo" | "osaka" | "nagoya"; // 今後拡張可能
}

export function ShareCard({ measurement, variant = "tokyo" }: ShareCardProps) {
  const updateTime = format(new Date(measurement.updatedAt), "MM/dd HH:mm");

  return (
    <div 
      id="share-card-element"
      className="bg-gradient-to-br from-indigo-50 to-white w-[1200px] h-[675px] flex flex-col p-12 relative overflow-hidden font-sans border-8 border-indigo-500 rounded-3xl"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -mt-32 -mr-32 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Header */}
      <div className="flex justify-between items-start relative z-10 mb-12">
        <div>
          <h1 className="text-4xl font-black text-indigo-900 tracking-tight">AIR Research</h1>
          <p className="text-2xl text-indigo-600 font-bold mt-2">空気タイプ速報</p>
        </div>
        <div className="text-right">
          <div className="text-5xl font-black text-slate-800 tracking-tight">{measurement.name}</div>
          <div className="text-2xl text-slate-500 font-medium mt-2">{updateTime} 更新</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center relative z-10 max-w-4xl">
        <div className="flex items-center space-x-6 mb-8">
          <AirTypeBadge airType={measurement.airType} size="lg" className="scale-150 origin-left" />
        </div>
        
        <p className="text-4xl leading-snug font-bold text-slate-800 mb-12">
          {measurement.comment}
        </p>

        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-white/50 shadow-xl inline-block max-w-3xl">
          <h3 className="text-xl font-bold text-slate-500 mb-6 uppercase tracking-widest">生活のめやす</h3>
          {/* ActionSigns は responsive なので幅固定内で表示 */}
          <ActionSigns signs={measurement.actionSigns} variant="full" className="gap-6 scale-125 origin-top-left w-[80%]" />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto relative z-10 flex justify-between items-end border-t-2 border-indigo-100 pt-6">
        <p className="text-lg text-slate-500 font-medium">
          環境省そらまめ君速報値等をもとにした生活目安です。医療・行政判断ではありません。
        </p>
        <p className="text-xl font-bold text-slate-400">
          出典: {measurement.sourceLabel}
        </p>
      </div>
    </div>
  );
}
