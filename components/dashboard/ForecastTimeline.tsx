import { AirForecast } from "@/lib/air/forecastService";

export function ForecastTimeline({ forecasts }: { forecasts: AirForecast[] }) {
  if (!forecasts || forecasts.length === 0) return null;

  // 空気タイプに基づく色分け設定 (AuroraUI思想に合わせた淡いトーン)
  const getAirColorClass = (type: string) => {
    switch (type) {
      case "すっきり":
        return "bg-cyan-50 text-cyan-700 border-cyan-100";
      case "おだやか":
        return "bg-blue-50 text-blue-700 border-blue-100";
      case "ひかえめ":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "もやっと":
        return "bg-amber-50 text-amber-700 border-amber-100";
      case "どんより":
        return "bg-orange-50 text-orange-700 border-orange-100";
      case "きけん":
        return "bg-rose-50 text-rose-700 border-rose-100";
      default:
        return "bg-slate-50 text-slate-700 border-slate-100";
    }
  };

  return (
    <div className="bg-white/40 backdrop-blur-xl rounded-2xl p-6 border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] max-w-full min-w-0 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-800 flex items-center">
          <span className="bg-gradient-to-r from-blue-500 to-cyan-400 w-1.5 h-5 rounded-full mr-2"></span>
          今日の空気の流れ
        </h2>
        <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
          12時間予測
        </span>
      </div>

      <div className="flex overflow-x-auto pb-4 -mx-2 px-2 snap-x hide-scrollbar space-x-3">
        {forecasts.map((f, idx) => {
          const date = new Date(f.time);
          const timeStr = `${date.getHours().toString().padStart(2, "0")}:00`;
          const colorClass = getAirColorClass(f.airType);

          return (
            <div 
              key={idx} 
              className={`flex-none w-28 snap-start rounded-xl border p-3 flex flex-col items-center justify-center space-y-2 transition-transform hover:scale-105 duration-300 ${colorClass}`}
            >
              <div className="text-xs font-bold opacity-70">{timeStr}</div>
              <div className="text-base font-black tracking-tight">{f.airType}</div>
              
              <div className="w-full pt-2 mt-1 border-t border-current/10 flex flex-col items-center">
                <div className="text-[10px] uppercase font-semibold opacity-60">PM2.5</div>
                <div className="text-xs font-bold">{f.pm25} <span className="text-[9px] opacity-70 font-normal">μg/m³</span></div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-2 text-right">
        <p className="text-[10px] text-slate-400 flex items-center justify-end">
          予測データ出典: <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="ml-1 text-cyan-600 hover:underline">Open-Meteo Air Quality</a>
        </p>
      </div>
    </div>
  );
}
